// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useFragmentVaults(options?: { refetchInterval?: number }) {
  return useApiQuery<any[]>({
    path: '/fragment/vaults',
    refetchInterval: options?.refetchInterval ?? 120_000,
    select: (d: any) => Array.isArray(d) ? d : d?.vaults ?? [],
  })
}
