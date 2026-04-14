import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import { useApiQuery } from './use-api-query'

export interface ProjectApplication {
  id: string
  project_name: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  client_id?: string
  created_at: string
}

export function useProjectApplications(options?: { refetchInterval?: number }) {
  return useApiQuery<ProjectApplication[]>({
    path: '/open/projects/applications/mine',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.applications ?? [],
  })
}

export function useProjectApply() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const apply = useCallback(async (data: {
    project_name: string
    description: string
    redirect_uris: string[]
    domains: string[]
    mcd_wallet?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/open/projects/apply', data)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { apply, loading, error }
}
