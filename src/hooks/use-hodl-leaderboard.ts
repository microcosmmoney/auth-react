import { useApiQuery } from './use-api-query'
import type { HodlLeaderboardEntry } from '@microcosmmoney/auth-core'

interface UseHodlLeaderboardParams {
  sort?: string
  page?: number
  page_size?: number
  refetchInterval?: number
}

export function useHodlLeaderboard(params?: UseHodlLeaderboardParams) {
  const p = params || {}
  let qs = `?page=${p.page || 1}&page_size=${p.page_size || 20}`
  if (p.sort) qs += `&sort=${p.sort}`
  return useApiQuery<HodlLeaderboardEntry[]>({
    path: `/hodl-challenge/leaderboard${qs}`,
    refetchInterval: p.refetchInterval ?? 60_000,
  })
}
