// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { Territory } from '@microcosmmoney/auth-core'

export function useTerritoryDetail(id?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<Territory>({
    path: `/territories/${id}`,
    requireAuth: true,
    skip: !id,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
