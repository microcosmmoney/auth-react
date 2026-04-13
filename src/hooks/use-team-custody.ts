import { useApiQuery } from './use-api-query'

export interface CustodyWallet {
  wallet_address: string
  role: string
  territory_id?: string
  sol_balance: number
  mcc_balance: number
  mcd_balance: number
  usdt_balance: number
}

export interface TeamCustodyData {
  wallets: CustodyWallet[]
  total_mcc: number
  total_mcd: number
  total_usdt: number
}

export function useTeamCustody(options?: { refetchInterval?: number }) {
  return useApiQuery<TeamCustodyData>({
    path: '/territories/team/custody',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
