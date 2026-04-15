import { useApiQuery } from './use-api-query'
import type { MCDTransaction } from '@microcosmmoney/auth-core'

export function useMCDTransactions(options?: { page?: number; pageSize?: number; type?: string; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  let qs = `?page=${page}&page_size=${pageSize}`
  if (options?.type) qs += `&type=${options.type}`
  return useApiQuery<MCDTransaction[]>({
    path: `/mcd/transactions${qs}`,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.records ?? [],
  })
}
