// AI-generated · AI-managed · AI-maintained
interface TokenExchangeConfig {
  clientId: string
  clientSecret: string
  tokenEndpoint?: string
  redirectUri?: string
}

interface TokenExchangeRequest {
  code?: string
  grant_type?: string
  refresh_token?: string
}

export function createTokenExchangeHandler(config: TokenExchangeConfig) {
  const tokenEndpoint = config.tokenEndpoint || 'https://microcosm.money/api/oauth/token'

  return async function POST(request: Request): Promise<Response> {
    try {
      if (!config.clientId || !config.clientSecret) {
        console.error(
          '[MicrocosmAuth] createTokenExchangeHandler: clientId and clientSecret are required. ' +
          'Ensure OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET environment variables are set on the server.'
        )
        return jsonResponse(
          { error: 'server_configuration_error', error_description: 'OAuth client credentials not configured on server' },
          500
        )
      }

      const body: TokenExchangeRequest = await request.json()

      const grantType = body.grant_type || 'authorization_code'

      const tokenBody: Record<string, string> = {
        grant_type: grantType,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }

      if (grantType === 'authorization_code') {
        if (!body.code) {
          return jsonResponse(
            { error: 'invalid_request', error_description: 'Missing authorization code' },
            400
          )
        }
        tokenBody.code = body.code

        const origin = request.headers.get('origin') || ''
        tokenBody.redirect_uri = origin
          ? `${origin}/auth/callback`
          : config.redirectUri || ''
      } else if (grantType === 'refresh_token') {
        if (!body.refresh_token) {
          return jsonResponse(
            { error: 'invalid_request', error_description: 'Missing refresh token' },
            400
          )
        }
        tokenBody.refresh_token = body.refresh_token
      } else {
        return jsonResponse(
          { error: 'unsupported_grant_type', error_description: `Unsupported: ${grantType}` },
          400
        )
      }

      const tokenResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenBody),
      })

      if (!tokenResponse.ok) {
        const errorData = await safeJson(tokenResponse)
        console.error('[MicrocosmAuth] Token exchange failed:', errorData)
        return jsonResponse(
          { error: 'token_error', error_description: 'Token exchange failed' },
          tokenResponse.status
        )
      }

      const tokenData = await tokenResponse.json()

      return jsonResponse({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        user_id: tokenData.user_id,
      })
    } catch (error) {
      console.error('[MicrocosmAuth] Exchange error:', error)
      return jsonResponse(
        { error: 'server_error', error_description: 'Internal server error' },
        500
      )
    }
  }
}

export function createProfileHandler(config?: {
  openApiBase?: string
  enrich?: (profile: Record<string, unknown>, token: string) => Promise<Record<string, unknown>>
}) {
  const openApiBase = config?.openApiBase || 'https://api.microcosm.money'

  return async function GET(request: Request): Promise<Response> {
    try {
      const authHeader = request.headers.get('authorization')
      if (!authHeader) {
        return jsonResponse({ error: 'unauthorized', message: 'Missing authorization header' }, 401)
      }

      const token = authHeader.replace('Bearer ', '')

      const profileRes = await fetch(`${openApiBase}/v1/users/me/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!profileRes.ok) {
        return jsonResponse({ error: 'profile_error', message: 'Failed to fetch profile' }, profileRes.status)
      }

      let profile = await profileRes.json()

      if (profile.data) profile = profile.data
      if (profile.user) profile = profile.user

      if (config?.enrich) {
        profile = await config.enrich(profile, token)
      }

      return jsonResponse(profile)
    } catch (error) {
      console.error('[MicrocosmAuth] Profile error:', error)
      return jsonResponse(
        { error: 'server_error', message: 'Internal server error' },
        500
      )
    }
  }
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function safeJson(response: Response): Promise<Record<string, string>> {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json()
  }
  const text = await response.text()
  return { error: 'Non-JSON Response', error_description: text.substring(0, 200) }
}
