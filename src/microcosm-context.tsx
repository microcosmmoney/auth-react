// AI-generated · AI-managed · AI-maintained
'use client'

import React, { createContext, useContext, useMemo } from 'react'

const OPEN_API_BASE = 'https://api.microcosm.money/v1'

interface MicrocosmContextValue {
  getAccessToken: () => Promise<string | null>
}

const MicrocosmContext = createContext<MicrocosmContextValue | null>(null)

export interface MicrocosmProviderProps {
  getAccessToken: () => Promise<string | null>
  children: React.ReactNode
}

export function MicrocosmProvider({ getAccessToken, children }: MicrocosmProviderProps) {
  const value = useMemo(() => ({ getAccessToken }), [getAccessToken])
  return <MicrocosmContext.Provider value={value}>{children}</MicrocosmContext.Provider>
}

export function useMicrocosmContext(): MicrocosmContextValue {
  const ctx = useContext(MicrocosmContext)
  if (!ctx) {
    throw new Error(
      'useMicrocosmContext must be used within <MicrocosmProvider> or <MicrocosmAuthProvider>. ' +
      'Wrap your app with <MicrocosmProvider getAccessToken={...}>'
    )
  }
  return ctx
}

interface MicrocosmApi {
  get: <T = any>(path: string) => Promise<T>
  post: <T = any>(path: string, body: unknown) => Promise<T>
  put: <T = any>(path: string, body: unknown) => Promise<T>
  patch: <T = any>(path: string, body: unknown) => Promise<T>
}

async function apiFetch<T>(
  path: string,
  getAccessToken: () => Promise<string | null>,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken()

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${OPEN_API_BASE}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After') || '60')
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
    return apiFetch(path, getAccessToken, options)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    const text = await response.text()
    throw new Error(`Non-JSON response from API: ${text.substring(0, 200)}`)
  }

  const data = await response.json()

  if (!response.ok) {
    const detail = data.detail
    const msg = typeof detail === 'string'
      ? detail
      : typeof detail === 'object' && detail !== null
        ? (detail.msg || detail.message || JSON.stringify(detail))
        : (data.error?.message || data.message || `API error ${response.status}`)
    throw new Error(msg)
  }

  return data as T
}

export function useMicrocosmApi(): MicrocosmApi {
  const { getAccessToken } = useMicrocosmContext()

  return useMemo(() => ({
    get: <T = any>(path: string) =>
      apiFetch<T>(path, getAccessToken),
    post: <T = any>(path: string, body: unknown) =>
      apiFetch<T>(path, getAccessToken, { method: 'POST', body: JSON.stringify(body) }),
    put: <T = any>(path: string, body: unknown) =>
      apiFetch<T>(path, getAccessToken, { method: 'PUT', body: JSON.stringify(body) }),
    patch: <T = any>(path: string, body: unknown) =>
      apiFetch<T>(path, getAccessToken, { method: 'PATCH', body: JSON.stringify(body) }),
  }), [getAccessToken])
}
