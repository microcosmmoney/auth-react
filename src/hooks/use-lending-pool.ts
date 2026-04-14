import { useApiQuery } from './use-api-query'

export function useLendingPool(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/lending/pool',
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
