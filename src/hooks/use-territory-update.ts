import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

interface TerritoryUpdateData {
  unit_name?: string
  description?: string
  image_url?: string
}

export function useTerritoryUpdate() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const update = useCallback(async (territoryId: string, data: TerritoryUpdateData): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.put<{ success: boolean; data: any }>(`/territories/${territoryId}`, data)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const updateName = useCallback(async (territoryId: string, name: string, force = false): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const qs = force ? '?force=true' : ''
      const res = await api.put<{ success: boolean; data: any }>(`/territories/${territoryId}/name${qs}`, { name })
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { update, updateName, loading, error }
}
