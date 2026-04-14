import { useApiQuery } from './use-api-query'

interface MCCPriceData {
  price: number
  price_change_24h?: number
  volume_24h?: number
  market_cap?: number
  source: string
  updated_at: string
}

export function useMCCPrice(options?: { refetchInterval?: number }) {
  return useApiQuery<MCCPriceData>({
    path: '/mcc/price',
    refetchInterval: options?.refetchInterval ?? 30_000,
  })
}
