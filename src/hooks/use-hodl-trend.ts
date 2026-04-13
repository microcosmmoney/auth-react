import { useApiQuery } from './use-api-query'
import type { HodlTrendPoint } from '@microcosmmoney/auth-core'

export function useHodlTrend(days?: number, options?: { refetchInterval?: number }) {
  return useApiQuery<HodlTrendPoint[]>({
    path: `/hodl-challenge/trend?days=${days || 30}`,
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
