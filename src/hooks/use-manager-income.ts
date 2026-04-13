import { useApiQuery } from './use-api-query'
import type { TerritoryIncome } from '@microcosmmoney/auth-core'

export interface ManagerIncomeData {
  total_income: number
  pending_income: number
  records: TerritoryIncome[]
}

export function useManagerIncome(options?: { refetchInterval?: number }) {
  return useApiQuery<ManagerIncomeData>({
    path: '/territories/manager/income',
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
