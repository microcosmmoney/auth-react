// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useFragmentHoldings(wallet?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<any[]>({
    path: `/fragment/holdings/${wallet}`,
    requireAuth: false,
    skip: !wallet,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.holdings ?? [],
  })
}
