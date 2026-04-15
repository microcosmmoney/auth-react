import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { LendingDepositInput, LendingWithdrawInput, LendingBorrowInput, LendingRepayInput, LendingExtendInput, LendingLiquidateInput } from '@microcosmmoney/auth-core'

export function useLendingAction() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const exec = useCallback(async <T>(path: string, params: unknown): Promise<T> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: T }>(path, params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const deposit = useCallback((params: LendingDepositInput) =>
    exec<any>('/lending/deposit/prepare', params), [exec])

  const withdraw = useCallback((params: LendingWithdrawInput) =>
    exec<any>('/lending/withdraw/prepare', params), [exec])

  const borrow = useCallback((params: LendingBorrowInput) =>
    exec<any>('/lending/borrow/prepare', params), [exec])

  const repay = useCallback((params: LendingRepayInput) =>
    exec<any>('/lending/repay/prepare', params), [exec])

  const extend = useCallback((params: LendingExtendInput) =>
    exec<any>('/lending/extend/prepare', params), [exec])

  const liquidate = useCallback((params: LendingLiquidateInput) =>
    exec<any>('/lending/liquidate/prepare', params), [exec])

  return { deposit, withdraw, borrow, repay, extend, liquidate, loading, error }
}
