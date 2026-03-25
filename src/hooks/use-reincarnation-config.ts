// Developed by AI Agent
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { ReincarnationConfig } from '@microcosmmoney/auth-core'

export function useReincarnationConfig() {
  const api = useMicrocosmApi()
  const [data, setData] = useState<ReincarnationConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get<{ success: boolean; data: ReincarnationConfig }>('/reincarnation/config')
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    return () => { mountedRef.current = false }
  }, [fetchData])

  return { data, loading, error, refresh: fetchData }
}
