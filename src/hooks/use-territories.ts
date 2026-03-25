// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { Territory } from '@microcosmmoney/auth-core'

export function useTerritories(options?: { unitType?: string; parentId?: string; page?: number; pageSize?: number; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  let qs = `?page=${page}&page_size=${pageSize}`
  if (options?.unitType) qs += `&unit_type=${options.unitType}`
  if (options?.parentId) qs += `&parent_id=${options.parentId}`
  return useApiQuery<Territory[]>({
    path: `/territories${qs}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
