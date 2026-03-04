// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useStationQueue(options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: '/territories/queue',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}
