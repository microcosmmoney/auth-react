import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export function useNotificationAction() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const markRead = useCallback(async (notificationId: string) => {
    try {
      setLoading(true)
      setError(null)
      return await api.post<{ success: boolean }>(`/notifications/${notificationId}/read`, {})
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const markAllRead = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      return await api.post<{ success: boolean }>('/notifications/read-all', {})
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { markRead, markAllRead, loading, error }
}
