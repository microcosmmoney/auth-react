import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'

export interface MCCAcquisitionEvent {
  wallet_address: string
  event_type: string
  source: string
  mcc_delta: number
  usdc_delta: number | null
  price_at_event: number | null
  tx_signature: string | null
  event_at: string
}

export interface MCCAcquisitionsData {
  events: MCCAcquisitionEvent[]
  total_mcc_in: number
  total_usdc_cost: number
  avg_cost: number
  first_event_at: string | null
  last_synced_at: string | null
  wallets: string[]
}

export interface UseMCCAcquisitionsResult {
  data: MCCAcquisitionsData | null
  loading: boolean
  refreshing: boolean
  error: Error | null
  refresh: (force?: boolean) => Promise<void>
}

export function useMCCAcquisitions(options?: { refetchInterval?: number }): UseMCCAcquisitionsResult {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<MCCAcquisitionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async (force = false) => {
    const token = await getAccessToken()
    if (!token) {
      if (mountedRef.current) { setData(null); setLoading(false) }
      return
    }
    try {
      if (force) setRefreshing(true)
      else setLoading(true)
      const path = force ? '/mcc/acquisitions?refresh=true' : '/mcc/acquisitions'
      const res = await api.get<{ success: boolean; data: MCCAcquisitionsData }>(path)
      if (mountedRef.current) {
        const inner = (res as any)?.data ?? res
        setData(inner as MCCAcquisitionsData)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    } finally {
      if (mountedRef.current) { setLoading(false); setRefreshing(false) }
    }
  }, [api, getAccessToken])

  useEffect(() => {
    mountedRef.current = true
    fetchData(false)
    const interval = options?.refetchInterval
    if (interval && interval > 0) {
      const timer = setInterval(() => fetchData(false), interval)
      return () => { mountedRef.current = false; clearInterval(timer) }
    }
    return () => { mountedRef.current = false }
  }, [fetchData, options?.refetchInterval])

  return { data, loading, refreshing, error, refresh: fetchData }
}
