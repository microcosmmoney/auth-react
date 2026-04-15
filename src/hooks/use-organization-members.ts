import { useApiQuery } from './use-api-query'

export function useOrganizationMembers(orgId?: number, options?: { page?: number; pageSize?: number; refetchInterval?: number }) {
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  return useApiQuery<any>({
    path: `/organizations/${orgId}/members?page=${page}&page_size=${pageSize}`,
    requireAuth: true,
    skip: !orgId,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
