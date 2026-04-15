import { useApiQuery } from './use-api-query'

export interface FragmentVaultHolder {
  wallet: string
  uid?: string
  display_name?: string
  fragments: number
  percentage: number
}

export function useFragmentVaultHolders(vaultId?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<FragmentVaultHolder[]>({
    path: `/fragment/vaults/${vaultId}/holders`,
    requireAuth: false,
    skip: !vaultId,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.holders ?? [],
  })
}
