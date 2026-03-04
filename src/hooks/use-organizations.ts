// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { Organization } from '@microcosmmoney/auth-core'

export function useOrganizations(options?: { refetchInterval?: number }) {
  return useApiQuery<Organization[]>({
    path: '/organizations',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
