import { useApiQuery } from './use-api-query'

export function useMCCMiningHistory(_days = 30, options?: { refetchInterval?: number }) {
  return useApiQuery<any[]>({
    path: `/mcc/history?tx_type=mining&page_size=200`,
    requireAuth: true,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.records ?? raw?.history ?? []),
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
