// AI-generated · AI-managed · AI-maintained
import { useState, useEffect, useCallback } from 'react'
import { MCCBalance, MCCPrice } from '@microcosmmoney/auth-core'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'

interface UseMCCResult {
  balance: MCCBalance | null
  price: MCCPrice | null
  loading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

export function useMCC(refreshInterval?: number): UseMCCResult {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [balance, setBalance] = useState<MCCBalance | null>(null)
  const [price, setPrice] = useState<MCCPrice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const pricePromise = api.get<{ data: MCCPrice }>('/mcc/price')
        .then(res => setPrice(res.data))
        .catch(() => {})

      const token = await getAccessToken()
      if (token) {
        const balancePromise = api.get<{ data: MCCBalance }>('/mcc/balance')
          .then(res => setBalance(res.data))
          .catch(() => {})

        await Promise.all([pricePromise, balancePromise])
      } else {
        await pricePromise
        setBalance(null)
      }

      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch MCC data'))
    } finally {
      setLoading(false)
    }
  }, [api, getAccessToken])

  useEffect(() => {
    fetchData()

    if (refreshInterval && refreshInterval > 0) {
      const timer = setInterval(fetchData, refreshInterval)
      return () => clearInterval(timer)
    }
  }, [fetchData, refreshInterval])

  return { balance, price, loading, error, refresh: fetchData }
}
