import { useState, useCallback, useEffect } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export interface TwoFactorStatus {
  enabled: boolean
  created_at?: string
}

export interface TwoFactorSetupData {
  secret: string
  qr_code: string
  backup_codes?: string[]
}

export interface UseTwoFactorResult {
  status: TwoFactorStatus | null
  setupData: TwoFactorSetupData | null
  loading: boolean
  error: string | null
  refreshStatus: () => Promise<void>
  beginSetup: () => Promise<void>
  verifySetup: (code: string) => Promise<string[] | undefined>
  disable: (password: string, code?: string) => Promise<void>
  clearError: () => void
  clearSetup: () => void
}

export function useTwoFactor(): UseTwoFactorResult {
  const api = useMicrocosmApi()
  const [status, setStatus] = useState<TwoFactorStatus | null>(null)
  const [setupData, setSetupData] = useState<TwoFactorSetupData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])
  const clearSetup = useCallback(() => setSetupData(null), [])

  const refreshStatus = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<any>('/users/me/2fa/status')
      const data = res?.data ?? res
      setStatus({
        enabled: !!(data?.enabled ?? data?.totp_enabled),
        created_at: data?.created_at,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load 2FA status')
    } finally {
      setLoading(false)
    }
  }, [api])

  useEffect(() => { refreshStatus() }, [refreshStatus])

  const beginSetup = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<any>('/users/me/2fa/setup', {})
      const data = res?.data ?? res
      setSetupData({
        secret: data?.secret || '',
        qr_code: data?.qr_code || data?.qrCode || '',
        backup_codes: data?.backup_codes || data?.backupCodes,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start 2FA setup')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api])

  const verifySetup = useCallback(async (code: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post<any>('/users/me/2fa/verify-setup', { code })
      if (res && res.success === false) {
        throw new Error(res.error || 'Invalid verification code')
      }
      const data = res?.data ?? res
      const backupCodes = data?.backup_codes || data?.backupCodes
      await refreshStatus()
      setSetupData(null)
      return backupCodes
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid verification code')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api, refreshStatus])

  const disable = useCallback(async (password: string, code?: string) => {
    setLoading(true)
    setError(null)
    try {
      const body: Record<string, string> = { password }
      if (code) body.code = code
      const res = await api.post<any>('/users/me/2fa/disable', body)
      if (res && res.success === false) {
        throw new Error(res.error || 'Failed to disable 2FA')
      }
      await refreshStatus()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to disable 2FA')
      throw e
    } finally {
      setLoading(false)
    }
  }, [api, refreshStatus])

  return {
    status,
    setupData,
    loading,
    error,
    refreshStatus,
    beginSetup,
    verifySetup,
    disable,
    clearError,
    clearSetup,
  }
}
