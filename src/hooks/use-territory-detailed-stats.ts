import { useApiQuery } from './use-api-query'
import type { TerritoryStats, TerritoryKPI, TechBonusDetail } from '@microcosmmoney/auth-core'

export interface TerritoryDetailedStats {
  stats: TerritoryStats
  kpi?: TerritoryKPI
  tech_bonus?: TechBonusDetail
}

export function useTerritoryDetailedStats(territoryId: string, options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryDetailedStats>({
    path: `/territories/${territoryId}/detailed-stats`,
    refetchInterval: options?.refetchInterval ?? 60_000,
    skip: !territoryId,
  })
}
