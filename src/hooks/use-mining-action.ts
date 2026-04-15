import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { MiningRequestResult } from '@microcosmmoney/auth-core'

interface MiningRequestParams {
  mcc_amount: number
  stablecoin?: string
  wallet_address: string
}

interface MiningConfirmParams {
  request_id: string
  tx_signature: string
  mcc_amount: number
  usdc_amount: number
  stablecoin_type?: string
}

export function useMiningAction() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const createRequest = useCallback(async (params: MiningRequestParams): Promise<MiningRequestResult | null> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: MiningRequestResult }>('/mining/request', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const confirm = useCallback(async (params: MiningConfirmParams): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/mining/confirm', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { createRequest, confirm, loading, error }
}
