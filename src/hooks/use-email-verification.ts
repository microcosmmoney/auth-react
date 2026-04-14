import { useState, useCallback } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export interface UseEmailVerificationResult {
  resendVerification: () => Promise<void>
  requestEmailChange: (newEmail: string, password: string) => Promise<void>
  verifyEmailChange: (newEmail: string, code: string) => Promise<{ email: string; email_verified: boolean }>
  loading: boolean
  error: string | null
  clearError: () => void
}

export function useEmailVerification(): UseEmailVerificationResult {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const resendVerification = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<any>('/users/me/resend-verification', {})
      if (res && res.success === false) {
        throw new Error(res.error || 'Failed to send verification email')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send verification email')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api])

  const requestEmailChange = useCallback(async (newEmail: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<any>('/users/me/change-email', { new_email: newEmail, password })
      if (res && res.success === false) {
        throw new Error(res.error || 'Failed to request email change')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to request email change')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api])

  const verifyEmailChange = useCallback(async (newEmail: string, code: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<any>('/users/me/verify-change-email', { new_email: newEmail, code })
      if (res && res.success === false) {
        throw new Error(res.error || 'Verification failed')
      }
      return {
        email: res?.data?.email || res?.email || newEmail,
        email_verified: res?.data?.email_verified ?? res?.email_verified ?? true,
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verification failed')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api])

  return { resendVerification, requestEmailChange, verifyEmailChange, loading, error, clearError }
}
