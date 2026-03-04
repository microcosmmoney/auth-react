// AI-generated · AI-managed · AI-maintained
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'

export function useTerritoryIncome(territoryId?: string, period = '30d') {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    const _token = await getAccessToken()
    if (!_token || !territoryId) {
      setData(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await api.get<{ success: boolean; data: any }>(`/territories/${territoryId}/income-chart?period=${period}`)
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, getAccessToken, territoryId, period])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refresh: fetchData }
}
