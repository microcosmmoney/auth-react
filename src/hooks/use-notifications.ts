// Developed by AI Agent
import { useApiQuery } from './use-api-query'

export interface Notification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  created_at: string
  data?: Record<string, any>
}

export function useNotifications(options?: { refetchInterval?: number; unreadOnly?: boolean }) {
  const params = new URLSearchParams()
  if (options?.unreadOnly) params.set('unread', 'true')
  const qs = params.toString()
  return useApiQuery<Notification[]>({
    path: `/notifications${qs ? `?${qs}` : ''}`,
    refetchInterval: options?.refetchInterval ?? 30_000,
  })
}
