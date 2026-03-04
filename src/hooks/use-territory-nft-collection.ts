// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useTerritoryNFTCollection(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/territory/collection',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
