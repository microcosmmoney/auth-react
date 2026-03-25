// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { TerritoryMember } from '@microcosmmoney/auth-core'

export function useTerritoryMembers(id?: string, options?: { page?: number; pageSize?: number; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  return useApiQuery<TerritoryMember[]>({
    path: `/territories/${id}/members?page=${page}&page_size=${pageSize}`,
    requireAuth: true,
    skip: !id,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
