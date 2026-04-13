import { useApiQuery } from './use-api-query'
import type { HodlPosition } from '@microcosmmoney/auth-core'

export function useHodlPositions(options?: { refetchInterval?: number }) {
  return useApiQuery<HodlPosition[]>({
    path: '/hodl-challenge/my-positions',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}
