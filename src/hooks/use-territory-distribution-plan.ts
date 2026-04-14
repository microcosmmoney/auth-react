import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import { useApiQuery } from './use-api-query'

interface DistributionPlan {
  territory_id: string
  distribution_type: string
  parameters: Record<string, any>
  updated_at: string
}

export function useTerritoryDistributionPlan(territoryId?: string) {
  const api = useMicrocosmApi()
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const query = useApiQuery<DistributionPlan>({
    path: `/territories/${territoryId}/distribution-plan`,
    skip: !territoryId,
    requireAuth: true,
  })

  const updatePlan = useCallback(async (plan: Partial<DistributionPlan>) => {
    if (!territoryId) return
    try {
      setUpdating(true)
      setUpdateError(null)
      const res = await api.put<{ success: boolean; data: DistributionPlan }>(`/territories/${territoryId}/distribution-plan`, plan)
      query.refresh()
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setUpdateError(e)
      throw e
    } finally {
      if (mountedRef.current) setUpdating(false)
    }
  }, [api, territoryId, query])

  return { ...query, updatePlan, updating, updateError }
}
