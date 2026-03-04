// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { OrganizationTreeNode } from '@microcosmmoney/auth-core'

export function useOrganizationTree(rootId?: string, options?: { refetchInterval?: number }) {
  const path = rootId ? `/organizations/tree?root_id=${rootId}` : '/organizations/tree'
  return useApiQuery<OrganizationTreeNode[]>({
    path,
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 120_000,
  })
}
