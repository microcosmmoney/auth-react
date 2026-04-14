import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export function useTechBonusAction() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const unlock = useCallback(async (nodeId: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/tech-bonus/unlock', { node_id: nodeId })
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const upgrade = useCallback(async (nodeId: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/tech-bonus/upgrade', { node_id: nodeId })
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { unlock, upgrade, loading, error }
}
