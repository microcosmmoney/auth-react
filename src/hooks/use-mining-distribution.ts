// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { MiningDistribution, PaginatedResult } from '@microcosmmoney/auth-core'

export function useMiningDistribution(options?: { page?: number; pageSize?: number; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  return useApiQuery<PaginatedResult<MiningDistribution>>({
    path: `/mining/distribution?page=${page}&page_size=${pageSize}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
