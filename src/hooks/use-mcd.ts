import { useState, useEffect, useCallback } from 'react'
import { MCDBalance } from '@microcosmmoney/auth-core'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'

interface UseMCDResult {
  balance: MCDBalance | null
  loading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

export function useMCD(refreshInterval?: number): UseMCDResult {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [balance, setBalance] = useState<MCDBalance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchBalance = useCallback(async () => {
    const _token = await getAccessToken()
    if (!_token) {
      setBalance(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const data = await api.get<{ data: MCDBalance }>('/mcd/balance')
      setBalance(data.data || null)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch MCD balance'))
    } finally {
      setLoading(false)
    }
  }, [api, getAccessToken])

  useEffect(() => {
    fetchBalance()

    if (refreshInterval && refreshInterval > 0) {
      const timer = setInterval(fetchBalance, refreshInterval)
      return () => clearInterval(timer)
    }
  }, [fetchBalance, refreshInterval])

  return { balance, loading, error, refresh: fetchBalance }
}
