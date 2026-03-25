// Developed by AI Agent
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { DashboardMarketSummary, DashboardUserSummary } from '@microcosmmoney/auth-core'

export interface DashboardSummary {
  market: DashboardMarketSummary | null
  user: DashboardUserSummary | null
}

export function useDashboardSummary(wallet?: string, options?: { refetchInterval?: number }) {
  const api = useMicrocosmApi()
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const promises: Promise<any>[] = [
        api.get<{ success: boolean; data: DashboardMarketSummary }>('/dashboard/market').catch(() => null),
      ]

      if (wallet) {
        promises.push(
          api.get<{ success: boolean; data: DashboardUserSummary }>(`/dashboard/user/${wallet}`).catch(() => null)
        )
      }

      const [marketRes, userRes] = await Promise.all(promises)

      if (mountedRef.current) {
        setData({
          market: marketRes?.data ?? null,
          user: userRes?.data ?? null,
        })
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, wallet])

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
