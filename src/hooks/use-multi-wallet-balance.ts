// AI-generated · AI-managed · AI-maintained
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'
import type { TokenPortfolio } from '@microcosmmoney/auth-core'

interface WalletBalance {
  wallet_address: string
  is_primary: boolean
  portfolio: TokenPortfolio
}

export function useMultiWalletBalance(options?: { refetchInterval?: number }) {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<WalletBalance[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    const _token = await getAccessToken()
    if (!_token) {
      setData(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const walletsRes = await api.get<{ success: boolean; data: { wallets: any[] } }>('/wallets')
      const wallets = walletsRes.data?.wallets || []

      const balances = await Promise.all(
        wallets.map(async (w: any) => {
          const balRes = await api.get<{ success: boolean; data: TokenPortfolio }>(`/wallets/${w.wallet_address}/tokens`).catch(() => ({ data: {} as TokenPortfolio }))
          return { wallet_address: w.wallet_address, is_primary: w.is_primary, portfolio: balRes.data }
        })
      )

      if (mountedRef.current) {
        setData(balances)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, getAccessToken])

  useEffect(() => {
    mountedRef.current = true
    fetchData()

    const interval = options?.refetchInterval ?? 120_000
    if (interval > 0) {
      const timer = setInterval(fetchData, interval)
      return () => { mountedRef.current = false; clearInterval(timer) }
    }
    return () => { mountedRef.current = false }
  }, [fetchData, options?.refetchInterval])

  return { data, loading, error, refresh: fetchData }
}
