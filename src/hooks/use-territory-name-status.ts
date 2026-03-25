// Developed by AI Agent
import { useApiQuery } from './use-api-query'

interface TerritoryNameStatus {
  current_name: string
  last_changed_at: string | null
  cooldown_ends_at: string | null
  can_change: boolean
}

export function useTerritoryNameStatus(territoryId?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryNameStatus>({
    path: `/territories/${territoryId}/name-status`,
    skip: !territoryId,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
