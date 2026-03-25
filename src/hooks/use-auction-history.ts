// Developed by AI Agent
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export function useAuctionHistory(params?: { page?: number; page_size?: number }) {
  const api = useMicrocosmApi()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const p = params || {}
  const page = p.page || 1
  const pageSize = p.page_size || 20

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get<{ success: boolean; data: any }>(`/auction-solana/history?page=${page}&page_size=${pageSize}`)
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, page, pageSize])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refresh: fetchData }
}
