import { useApiQuery } from './use-api-query'

export interface InterestCalculation {
  principal: number
  rate: number
  duration_days: number
  total_interest: number
  total_repayment: number
}

export interface BorrowCostEstimate {
  nft_value: number
  max_borrow: number
  ltv_ratio: number
  estimated_interest: number
  estimated_total: number
}

export function useLendingInterest(params?: {
  amount: number
  duration_days: number
}, options?: { refetchInterval?: number }) {
  const qs = params ? `?amount=${params.amount}&duration_days=${params.duration_days}` : ''
  return useApiQuery<InterestCalculation>({
    path: `/lending/calculate-interest${qs}`,
    requireAuth: false,
    skip: !params,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}

export function useLendingBorrowCost(nftMint?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<BorrowCostEstimate>({
    path: `/lending/estimate-borrow-cost/${nftMint}`,
    requireAuth: false,
    skip: !nftMint,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
