// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useFragmentConfig(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/fragment/config',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
