// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useLendingStats(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/lending/stats',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
