// AI-generated · AI-managed · AI-maintained
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'
import type { MiningHistoryItem, PaginatedResult } from '@microcosmmoney/auth-core'

export function useMiningHistory(params?: { limit?: number; offset?: number }) {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<PaginatedResult<MiningHistoryItem> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const p = params || {}
  const limit = p.limit || 20
  const offset = p.offset || 0

  const fetchData = useCallback(async () => {
    const _token = await getAccessToken()
    if (!_token) {
      setData(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await api.get<{ success: boolean; data: PaginatedResult<MiningHistoryItem> }>(`/mining/history?limit=${limit}&offset=${offset}`)
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, getAccessToken, limit, offset])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refresh: fetchData }
}
