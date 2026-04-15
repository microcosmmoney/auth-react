import { useApiQuery } from './use-api-query'

export function useMCDStats(options?: { refetchInterval?: number }) {
  return useApiQuery({
    path: '/mcd/stats',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
