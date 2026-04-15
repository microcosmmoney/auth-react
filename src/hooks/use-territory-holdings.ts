import { useApiQuery } from './use-api-query'
import type { TerritoryHoldings } from '@microcosmmoney/auth-core'

export function useTerritoryHoldings(wallet: string | null | undefined, options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryHoldings>({
    path: wallet ? `/territory/holdings/${wallet}` : '/territory/holdings',
    requireAuth: !wallet,
    refetchInterval: options?.refetchInterval ?? 300_000,
    skip: !wallet,
  })
}
