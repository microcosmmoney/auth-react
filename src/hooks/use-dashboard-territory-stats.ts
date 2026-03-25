// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useDashboardTerritoryStats(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/dashboard/stats/territories',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
