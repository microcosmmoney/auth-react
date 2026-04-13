import { useApiQuery } from './use-api-query'
import type { HodlPoolStats } from '@microcosmmoney/auth-core'

export function useHodlPool(options?: { refetchInterval?: number }) {
  return useApiQuery<HodlPoolStats>({
    path: '/hodl-challenge/pool',
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}
