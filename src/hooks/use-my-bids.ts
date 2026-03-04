// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { AuctionBid } from '@microcosmmoney/auth-core'

export function useMyBids(options?: { refetchInterval?: number }) {
  return useApiQuery<AuctionBid[]>({
    path: '/auction-solana/my-bids',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
