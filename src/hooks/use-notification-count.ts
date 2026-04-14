import { useApiQuery } from './use-api-query'

export function useNotificationCount(options?: { refetchInterval?: number }) {
  return useApiQuery<{ count: number }>({
    path: '/notifications/unread-count',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 30_000,
  })
}
