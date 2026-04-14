import { useApiQuery } from './use-api-query'
import type { TechBonus } from '@microcosmmoney/auth-core'

export function useTechBonus(options?: { refetchInterval?: number }) {
  return useApiQuery<TechBonus>({
    path: '/tech-bonus/user',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
