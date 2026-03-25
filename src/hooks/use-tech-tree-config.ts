// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { TechTreeNode } from '@microcosmmoney/auth-core'

export function useTechTreeConfig(options?: { refetchInterval?: number }) {
  return useApiQuery<TechTreeNode[]>({
    path: '/tech-tree/config',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
