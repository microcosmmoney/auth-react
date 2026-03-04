// AI-generated · AI-managed · AI-maintained
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'

export function useTerritoryRanking(territoryId?: string, params?: { page?: number; page_size?: number }) {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const p = params || {}
  const page = p.page || 1
  const pageSize = p.page_size || 20

  const fetchData = useCallback(async () => {
    const _token = await getAccessToken()
    if (!_token || !territoryId) {
      setData(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await api.get<{ success: boolean; data: any }>(`/territories/${territoryId}/member-ranking?page=${page}&page_size=${pageSize}`)
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, getAccessToken, territoryId, page, pageSize])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refresh: fetchData }
}
