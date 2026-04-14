import { useApiQuery } from './use-api-query'
import type { Organization } from '@microcosmmoney/auth-core'

export function useOrganizations(options?: { refetchInterval?: number }) {
  return useApiQuery<Organization[]>({
    path: '/organizations',
    requireAuth: true,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.organizations ?? []),
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
