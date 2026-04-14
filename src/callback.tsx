import React, { useEffect, useState } from 'react'
import { useAuth } from './provider'

function isSameOrigin(url: string): boolean {
  if (url.startsWith('/') && !url.startsWith('//')) return true
  try {
    const parsed = new URL(url, window.location.origin)
    return parsed.origin === window.location.origin
  } catch {
    return false
  }
}

interface AuthCallbackProps {
  redirectTo?: string
  onSuccess?: (user: unknown) => void
  onError?: (error: Error) => void
  loadingComponent?: React.ReactNode
  errorComponent?: (error: Error) => React.ReactNode
}

export function AuthCallback({
  redirectTo = '/dashboard',
  onSuccess,
  onError,
  loadingComponent,
  errorComponent,
}: AuthCallbackProps) {
  const { client } = useAuth()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const handleCallback = async () => {
      try {
        const user = await client.handleCallback()

        if (cancelled) return

        onSuccess?.(user)
        const safeRedirect = isSameOrigin(redirectTo) ? redirectTo : '/dashboard'
        window.location.href = safeRedirect
      } catch (err) {
        if (cancelled) return

        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)
        onError?.(error)
      }
    }

    handleCallback()

    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    if (errorComponent) {
      return <>{errorComponent(error)}</>
    }
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'monospace' }}>
        <h2 style={{ color: '#ef4444', marginBottom: 8 }}>Login Failed</h2>
        <p style={{ color: '#71717a', marginBottom: 16 }}>{error.message}</p>
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            padding: '8px 16px',
            border: '1px solid #3f3f46',
            borderRadius: 4,
            background: 'transparent',
            color: '#a1a1aa',
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  if (loadingComponent) {
    return <>{loadingComponent}</>
  }

  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'monospace' }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: '2px solid #6366f1',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'mc-spin 1s linear infinite',
          margin: '0 auto 16px',
        }}
      />
      <p style={{ color: '#71717a' }}>Processing login...</p>
      <style>{`@keyframes mc-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
