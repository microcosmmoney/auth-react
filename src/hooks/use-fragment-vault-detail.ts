// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useFragmentVaultDetail(vaultId?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: `/fragment/vault/${vaultId}`,
    skip: !vaultId,
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}
