// Developed by AI Agent
import { useApiQuery } from './use-api-query'

interface PoolData {
  usdc_balance?: number
  usdt_balance?: number
  mcc_balance?: number
  total_stablecoin?: number
}

export function useReincarnationPool(options?: { refetchInterval?: number }) {
  return useApiQuery<PoolData>({
    path: '/reincarnation/pool',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
