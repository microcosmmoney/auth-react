import { useApiQuery } from './use-api-query'
import type { OrganizationTreeNode } from '@microcosmmoney/auth-core'

export function useOrganizationTree(rootId?: string, options?: { refetchInterval?: number }) {
  const path = rootId ? `/organizations/tree?root_id=${rootId}` : '/organizations/tree'
  return useApiQuery<OrganizationTreeNode[]>({
    path,
    requireAuth: true,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.tree ?? raw?.nodes ?? []),
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
