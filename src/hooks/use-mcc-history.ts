import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'
import type { MCCHistoryRecord, PaginatedResult } from '@microcosmmoney/auth-core'

export function useMCCHistory(params?: { tx_type?: string; page?: number; page_size?: number }) {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<PaginatedResult<MCCHistoryRecord> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const p = params || {}
  const page = p.page || 1
  const pageSize = p.page_size || 20
  const txType = p.tx_type

  const fetchData = useCallback(async () => {
    const _token = await getAccessToken()
    if (!_token) {
      setData(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      let qs = `?page=${page}&page_size=${pageSize}`
      if (txType) qs += `&tx_type=${txType}`
      const res = await api.get<{ success: boolean; data: PaginatedResult<MCCHistoryRecord> }>(`/mcc/history${qs}`)
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, getAccessToken, page, pageSize, txType])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refresh: fetchData }
}
