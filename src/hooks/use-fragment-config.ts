// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export function useFragmentConfig(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/fragment/config',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
