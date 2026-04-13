import { useState, useCallback, useRef } from 'react'
import { useApiQuery } from './use-api-query'
import { useMicrocosmApi } from '../microcosm-context'
import type { CrashChallengeStatus, CrashChallengeAttempt, CrashRegisterRequest } from '@microcosmmoney/auth-core'

export function useCrashChallengeStatus(options?: { refetchInterval?: number }) {
  return useApiQuery<CrashChallengeStatus>({
    path: '/crash-challenge/status',
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}

export function useCrashMyChallenges(options?: { refetchInterval?: number }) {
  return useApiQuery<CrashChallengeAttempt[]>({
    path: '/crash-challenge/my-challenges',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}

export function useCrashRegister() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const register = useCallback(async (params: CrashRegisterRequest) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/crash-challenge/register', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { register, loading, error }
}
