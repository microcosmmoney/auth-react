import { useState, useCallback } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export interface ChangePasswordResult {
  session_token?: string
  expires_in?: number
}

export interface UseChangePasswordResult {
  changePassword: (currentPassword: string, newPassword: string) => Promise<ChangePasswordResult>
  loading: boolean
  error: string | null
  clearError: () => void
}

export function useChangePassword(): UseChangePasswordResult {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<any>('/users/me/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      })
      if (res && res.success === false) {
        throw new Error(res.error || 'Failed to change password')
      }
      return {
        session_token: res?.data?.session_token,
        expires_in: res?.data?.expires_in,
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to change password')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api])

  return { changePassword, loading, error, clearError }
}
