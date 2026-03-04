// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useLendingLPBalance(wallet?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: `/lending/lp/${wallet}`,
    requireAuth: false,
    skip: !wallet,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
