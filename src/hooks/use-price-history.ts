// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { PriceHistoryPoint } from '@microcosmmoney/auth-core'

type TimeRange = '1D' | '7D' | '30D'

export function usePriceHistory(range: TimeRange = '7D', options?: { refetchInterval?: number }) {
  return useApiQuery<PriceHistoryPoint[]>({
    path: `/mcc/price/history?range=${range}`,
    refetchInterval: options?.refetchInterval ?? 300_000,
    select: (d: any) => Array.isArray(d) ? d : d?.records ?? [],
  })
}
