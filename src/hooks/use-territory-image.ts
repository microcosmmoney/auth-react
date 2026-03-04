// AI-generated · AI-managed · AI-maintained
import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export function useTerritoryImage() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const uploadImage = useCallback(async (territoryId: string, imageUrl: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.put<{ success: boolean; data: any }>(`/territories/${territoryId}`, { image_url: imageUrl })
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { uploadImage, loading, error }
}
