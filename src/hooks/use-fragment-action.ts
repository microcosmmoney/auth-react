import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { FragmentBuyInput, FragmentizeInput, FragmentRedeemInput, FragmentBuyoutInitiateInput, FragmentBuyoutAcceptInput, FragmentBuyoutCompleteInput, FragmentBuyoutCancelInput } from '@microcosmmoney/auth-core'

export function useFragmentAction() {
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

  const buy = useCallback((params: FragmentBuyInput) =>
    exec<any>('/fragment/buy/prepare', params), [exec])

  const fragmentize = useCallback((params: FragmentizeInput) =>
    exec<any>('/fragment/fragmentize/prepare', params), [exec])

  const redeem = useCallback((params: FragmentRedeemInput) =>
    exec<any>('/fragment/redeem/prepare', params), [exec])

  const initiateBuyout = useCallback((params: FragmentBuyoutInitiateInput) =>
    exec<any>('/fragment/buyout/initiate/prepare', params), [exec])

  const acceptBuyout = useCallback((params: FragmentBuyoutAcceptInput) =>
    exec<any>('/fragment/buyout/accept/prepare', params), [exec])

  const completeBuyout = useCallback((params: FragmentBuyoutCompleteInput) =>
    exec<any>('/fragment/buyout/complete/prepare', params), [exec])

  const cancelBuyout = useCallback((params: FragmentBuyoutCancelInput) =>
    exec<any>('/fragment/buyout/cancel/prepare', params), [exec])

  return { buy, fragmentize, redeem, initiateBuyout, acceptBuyout, completeBuyout, cancelBuyout, loading, error }
}
