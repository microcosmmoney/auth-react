import { useApiQuery } from './use-api-query'
import type { Proposal } from '@microcosmmoney/auth-core'

export function useProposals(options?: { status?: string; page?: number; pageSize?: number; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  let qs = `?page=${page}&page_size=${pageSize}`
  if (options?.status) qs += `&status=${options.status}`
  return useApiQuery<Proposal[]>({
    path: `/voting/proposals${qs}`,
    requireAuth: true,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.proposals ?? []),
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
