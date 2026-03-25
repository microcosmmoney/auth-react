// Developed by AI Agent
import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

interface PublicMiningRequestParams {
  wallet_address: string
  mcc_amount: number
  stablecoin?: string
}

export function usePublicMining() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const createRequest = useCallback(async (params: PublicMiningRequestParams): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/mining/public/request', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const verify = useCallback(async (requestId: string, txSignature: string): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/mining/public/verify', {
        request_id: requestId,
        tx_signature: txSignature,
      })
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { createRequest, verify, loading, error }
}
