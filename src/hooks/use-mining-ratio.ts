// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { MiningRatio } from '@microcosmmoney/auth-core'

export function useMiningRatio(options?: { refetchInterval?: number }) {
  return useApiQuery<MiningRatio>({
    path: '/mining/ratio',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
