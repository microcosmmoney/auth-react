// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useMCCMiningHistory(days = 30, options?: { refetchInterval?: number }) {
  return useApiQuery<any[]>({
    path: `/reincarnation/mining-history?days=${days}`,
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
