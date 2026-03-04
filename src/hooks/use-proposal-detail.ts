// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { ProposalDetail } from '@microcosmmoney/auth-core'

export function useProposalDetail(id?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<ProposalDetail>({
    path: `/voting/proposals/${id}`,
    requireAuth: true,
    skip: !id,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
