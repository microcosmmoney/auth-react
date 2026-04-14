import { useApiQuery } from './use-api-query'
import type { MiningRecord, PaginatedResult } from '@microcosmmoney/auth-core'

export function useMiningRecords(options?: {
  limit?: number
  page?: number
  pageSize?: number
  refetchInterval?: number
}) {
  const pageSize = options?.pageSize ?? options?.limit ?? 20
  const page = options?.page ?? 1
  return useApiQuery<PaginatedResult<MiningRecord>>({
    path: `/mining/records?page=${page}&page_size=${pageSize}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
