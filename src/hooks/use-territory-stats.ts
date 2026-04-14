import { useApiQuery } from './use-api-query'
import type { TerritoryStats } from '@microcosmmoney/auth-core'

export function useTerritoryStats(id?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryStats>({
    path: `/territories/${id}/stats`,
    requireAuth: true,
    skip: !id,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
