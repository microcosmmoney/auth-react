import { useApiQuery } from './use-api-query'

export interface EcosystemEpoch {
  current_epoch: number
  epoch_minted: number
  epoch_yield: number
  mining_vault_mcc: number
}

export interface EcosystemLp {
  mcc_allocated: number
  usdc_balance: number
}

export interface EcosystemMining {
  total_usd: number
  total_mcc: number
  total_count: number
}

export interface EcosystemBuyback {
  total_usd: number
  total_mcc: number
  total_count: number
  pool_usd_balance: number
}

export interface EcosystemOperationsData {
  epoch: EcosystemEpoch
  lp: EcosystemLp
  mining: EcosystemMining
  buyback: EcosystemBuyback
}

export function useEcosystemOperations(options?: { refetchInterval?: number }) {
  return useApiQuery<EcosystemOperationsData>({
    path: '/dashboard/ecosystem-operations',
    refetchInterval: options?.refetchInterval ?? 60_000,
  })
}
