// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { TechTreeBonus } from '@microcosmmoney/auth-core'

export function useTechTreeBonus(options?: { refetchInterval?: number }) {
  return useApiQuery<TechTreeBonus>({
    path: '/tech-tree/bonus',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
