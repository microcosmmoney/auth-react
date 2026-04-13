import { useApiQuery } from './use-api-query'

export function useLendingOracle(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/lending/oracle',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
