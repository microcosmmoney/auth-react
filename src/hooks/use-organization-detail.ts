// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { Organization } from '@microcosmmoney/auth-core'

export function useOrganizationDetail(orgId?: number, options?: { refetchInterval?: number }) {
  return useApiQuery<Organization>({
    path: `/organizations/${orgId}`,
    requireAuth: true,
    skip: !orgId,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
