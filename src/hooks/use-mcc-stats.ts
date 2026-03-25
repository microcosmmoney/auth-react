// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { MCCStats } from '@microcosmmoney/auth-core'

export function useMCCStats(options?: { refetchInterval?: number }) {
  return useApiQuery<MCCStats>({
    path: '/mcc/stats',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
