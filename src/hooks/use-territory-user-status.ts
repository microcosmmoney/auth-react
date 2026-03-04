// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export function useTerritoryUserStatus(uid?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<any>({
    path: `/territory/user-status/${uid}`,
    requireAuth: false,
    skip: !uid,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
