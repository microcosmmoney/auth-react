// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useTerritoryNFTs(wallet?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<any[]>({
    path: `/territory/nfts/${wallet}`,
    skip: !wallet,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.nfts ?? [],
  })
}
