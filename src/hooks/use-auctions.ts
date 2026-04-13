import { useApiQuery } from './use-api-query'
import type { Auction } from '@microcosmmoney/auth-core'

interface AuctionFilters {
  status?: string
  unit_type?: string
  sort_by?: string
  page?: number
  limit?: number
  refetchInterval?: number
}

export function useAuctions(options?: AuctionFilters) {
  const params = new URLSearchParams()
  if (options?.status) params.set('status', options.status)
  if (options?.unit_type) params.set('unit_type', options.unit_type)
  if (options?.sort_by) params.set('sort_by', options.sort_by)
  if (options?.page) params.set('page', String(options.page))
  if (options?.limit) params.set('limit', String(options.limit))
  const qs = params.toString()
  const path = qs ? `/auction-solana/active?${qs}` : '/auction-solana/active'

  return useApiQuery<Auction[]>({
    path,
    select: (raw: any) => Array.isArray(raw) ? raw : (raw?.auctions ?? []),
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}
