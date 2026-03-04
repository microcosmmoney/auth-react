// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useAuctionConfig(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/auction-solana/config',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
