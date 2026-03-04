// AI-generated · AI-managed · AI-maintained
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi, useMicrocosmContext } from '../microcosm-context'

interface UseApiQueryOptions<T = any> {
  path: string
  requireAuth?: boolean
  refetchInterval?: number
  skip?: boolean
  select?: (raw: any) => T
}

export interface UseApiQueryResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refresh: () => Promise<void>
}

export function useApiQuery<T = any>(options: UseApiQueryOptions<T>): UseApiQueryResult<T> {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)
  const skipRef = useRef(options.skip)
  skipRef.current = options.skip

  const fetchData = useCallback(async () => {
    if (skipRef.current) { setData(null); setLoading(false); return }
    if (options.requireAuth) {
      const token = await getAccessToken()
      if (!token) { setData(null); setLoading(false); return }
    }
    try {
      setLoading(true)
      const res = await api.get<{ success: boolean; data: any }>(options.path)
      if (mountedRef.current) {
        setData(options.select ? options.select(res.data) : res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, options.path, options.requireAuth, getAccessToken])

  useEffect(() => {
    mountedRef.current = true
    fetchData()

    const interval = options.refetchInterval
    if (interval && interval > 0 && !options.skip) {
      const timer = setInterval(fetchData, interval)
      return () => { mountedRef.current = false; clearInterval(timer) }
    }

    return () => { mountedRef.current = false }
  }, [fetchData, options.refetchInterval, options.skip])

  return { data, loading, error, refresh: fetchData }
}
