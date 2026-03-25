// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { TechTree } from '@microcosmmoney/auth-core'

export function useTechTree(options?: { refetchInterval?: number }) {
  return useApiQuery<TechTree>({
    path: '/tech-tree/user',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
