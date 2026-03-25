// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { UserLevel } from '@microcosmmoney/auth-core'

export function useUserLevel(options?: { refetchInterval?: number }) {
  return useApiQuery<UserLevel>({
    path: '/users/me/level',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
