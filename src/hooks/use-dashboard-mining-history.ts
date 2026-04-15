import { useApiQuery } from './use-api-query'

export function useDashboardMiningHistory(days = 30, options?: { refetchInterval?: number }) {
  return useApiQuery<any[]>({
    path: `/dashboard/stats/mining-history?days=${days}`,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.records ?? raw?.history ?? []),
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
