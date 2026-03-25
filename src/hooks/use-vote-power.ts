// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { VotePower } from '@microcosmmoney/auth-core'

export function useVotePower(options?: { refetchInterval?: number }) {
  return useApiQuery<VotePower>({
    path: '/voting/power',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
