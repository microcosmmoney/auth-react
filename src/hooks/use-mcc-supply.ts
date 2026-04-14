import { useApiQuery } from './use-api-query'

export interface MCCTokenInfo {
  mint: string
  name: string
  symbol: string
  decimals: number
  total_supply: number
  circulating_supply: number
}

export function useMCCCirculatingSupply(options?: { refetchInterval?: number }) {
  return useApiQuery<{ circulating_supply: number }>({
    path: '/mcc/circulating-supply',
    requireAuth: false,
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}

export function useMCCTotalSupply(options?: { refetchInterval?: number }) {
  return useApiQuery<{ total_supply: number }>({
    path: '/mcc/total-supply',
    requireAuth: false,
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}

export function useMCCTokenInfo(options?: { refetchInterval?: number }) {
  return useApiQuery<MCCTokenInfo>({
    path: '/mcc/token-info',
    requireAuth: false,
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
