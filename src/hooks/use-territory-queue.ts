// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

export interface QueueListItem {
  position: number
  display_name: string
  status: string
  joined_at: string
  is_me: boolean
}

export interface TerritoryQueueData {
  in_queue: boolean
  is_onboarded: boolean
  territory_id: string | null
  station_name: string | null
  user_type: string
  user_rank: number
  position?: number
  total_in_queue: number
  queue_list: QueueListItem[]
  status?: string
  joined_at?: string
}

export function useTerritoryQueue(options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryQueueData>({
    path: '/territories/queue',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 30_000,
  })
}
