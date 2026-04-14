import { useApiQuery } from './use-api-query'
import type { TechBonusNode } from '@microcosmmoney/auth-core'

export function useTechBonusConfig(options?: { refetchInterval?: number }) {
  return useApiQuery<TechBonusNode[]>({
    path: '/tech-bonus/config',
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.nodes ?? raw?.config ?? []),
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
