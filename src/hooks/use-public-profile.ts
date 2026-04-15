import { useApiQuery } from './use-api-query'

export interface PublicProfile {
  uid: string
  display_name: string | null
  avatar_url: string | null
  level: number
  title: string | null
  territory_id: string | null
  joined_at: string
}

export function usePublicProfile(uid?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<PublicProfile>({
    path: `/users/${uid}/profile`,
    requireAuth: false,
    skip: !uid,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}

export function useDetailedProfile(uid?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<PublicProfile & { mining_stats?: any; wallet?: string }>({
    path: `/users/${uid}/profile/detailed`,
    requireAuth: true,
    skip: !uid,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
