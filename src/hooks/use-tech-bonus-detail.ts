import { useApiQuery } from './use-api-query'
import type { TechBonusDetail } from '@microcosmmoney/auth-core'

export function useTechBonusDetail(options?: { refetchInterval?: number }) {
  return useApiQuery<TechBonusDetail>({
    path: '/tech-bonus/bonus',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
