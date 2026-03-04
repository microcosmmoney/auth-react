// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { UserStats } from '@microcosmmoney/auth-core'

export function useUserStats(options?: { refetchInterval?: number }) {
  return useApiQuery<UserStats>({
    path: '/dashboard/stats/users',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
