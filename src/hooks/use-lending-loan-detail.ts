import { useApiQuery } from './use-api-query'

export interface LendingLoanDetail {
  loan_id: string
  nft_mint: string
  borrower: string
  amount: number
  interest_rate: number
  duration_days: number
  start_time: string
  end_time: string
  status: 'active' | 'repaid' | 'liquidated' | 'extended'
  collateral_value: number
}

export function useLendingLoanDetail(loanId?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<LendingLoanDetail>({
    path: `/lending/loans/${loanId}`,
    requireAuth: false,
    skip: !loanId,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
