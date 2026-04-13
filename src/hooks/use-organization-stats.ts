import { useApiQuery } from './use-api-query'

export function useOrganizationStats(orgId?: number, options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: `/organizations/${orgId}/stats`,
    requireAuth: false,
    skip: !orgId,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
