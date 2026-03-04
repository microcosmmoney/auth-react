// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { AuctionDetail } from '@microcosmmoney/auth-core'

export function useAuctionDetail(id?: number, options?: { refetchInterval?: number }) {
  return useApiQuery<AuctionDetail>({
    path: `/auction-solana/auction/${id}`,
    skip: id === undefined || id === null,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
