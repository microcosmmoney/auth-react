// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { DashboardMarketSummary } from '@microcosmmoney/auth-core'

export function useMarketData(options?: { refetchInterval?: number }) {
  return useApiQuery<DashboardMarketSummary>({
    path: '/dashboard/market',
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
