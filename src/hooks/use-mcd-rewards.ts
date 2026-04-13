import { useApiQuery } from './use-api-query'
import type { MCDReward } from '@microcosmmoney/auth-core'

export function useMCDRewards(options?: { page?: number; pageSize?: number; startDate?: string; endDate?: string; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  let qs = `?page=${page}&page_size=${pageSize}`
  if (options?.startDate) qs += `&start_date=${options.startDate}`
  if (options?.endDate) qs += `&end_date=${options.endDate}`
  return useApiQuery<MCDReward[]>({
    path: `/mcd/rewards${qs}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.records ?? [],
  })
}
