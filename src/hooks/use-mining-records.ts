// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { MiningRecord, PaginatedResult } from '@microcosmmoney/auth-core'

export function useMiningRecords(options?: { limit?: number; refetchInterval?: number }) {
  const limit = options?.limit ?? 20
  return useApiQuery<PaginatedResult<MiningRecord>>({
    path: `/mining/records?limit=${limit}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
