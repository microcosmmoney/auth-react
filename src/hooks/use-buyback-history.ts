// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { BuybackRecord } from '@microcosmmoney/auth-core'

export function useBuybackHistory(options?: { page?: number; pageSize?: number; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  return useApiQuery<BuybackRecord[]>({
    path: `/reincarnation/user-history?page=${page}&page_size=${pageSize}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.records ?? [],
  })
}
