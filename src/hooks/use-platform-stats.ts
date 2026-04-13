import { useApiQuery } from './use-api-query'

export function usePlatformStats(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/dashboard/platform',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
