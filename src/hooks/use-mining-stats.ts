// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { MiningStats } from '@microcosmmoney/auth-core'

export function useMiningStats(options?: { refetchInterval?: number }) {
  return useApiQuery<MiningStats>({
    path: '/mining/stats',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
