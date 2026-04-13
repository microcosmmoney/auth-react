import { useApiQuery } from './use-api-query'

export function useMCCHolders(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/reincarnation/holders',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
