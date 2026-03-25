// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { AuctionBid } from '@microcosmmoney/auth-core'

export function useAuctionBids(auctionId?: number, options?: { refetchInterval?: number }) {
  return useApiQuery<AuctionBid[]>({
    path: `/auction-solana/auction/${auctionId}/bids`,
    skip: auctionId === undefined || auctionId === null,
    refetchInterval: options?.refetchInterval ?? 30_000,
  })
}
