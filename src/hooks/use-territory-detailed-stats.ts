// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { TerritoryStats, TerritoryKPI, TechTreeBonus } from '@microcosmmoney/auth-core'

export interface TerritoryDetailedStats {
  stats: TerritoryStats
  kpi?: TerritoryKPI
  tech_bonus?: TechTreeBonus
}

export function useTerritoryDetailedStats(territoryId: string, options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryDetailedStats>({
    path: `/territories/${territoryId}/detailed-stats`,
    refetchInterval: options?.refetchInterval ?? 60_000,
    skip: !territoryId,
  })
}
