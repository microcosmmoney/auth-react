import { useApiQuery } from './use-api-query'
import type { AuctionBid } from '@microcosmmoney/auth-core'

export function useMyBids(options?: { refetchInterval?: number }) {
  return useApiQuery<AuctionBid[]>({
    path: '/auction-solana/my-bids',
    requireAuth: true,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.bids ?? []),
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
