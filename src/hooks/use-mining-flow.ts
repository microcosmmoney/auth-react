import { useState, useCallback } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export type MiningFlowStep = 'idle' | 'requesting' | 'confirming' | 'signing' | 'completed' | 'error'

export interface MiningFlowState {
  step: MiningFlowStep
  requestData: any | null
  confirmData: any | null
  txSignature: string | null
  error: string | null
}

export function useMiningFlow() {
  const api = useMicrocosmApi()
  const [state, setState] = useState<MiningFlowState>({
    step: 'idle',
    requestData: null,
    confirmData: null,
    txSignature: null,
    error: null,
  })

  const reset = useCallback(() => {
    setState({ step: 'idle', requestData: null, confirmData: null, txSignature: null, error: null })
  }, [])

  const startMining = useCallback(async (params: {
    amount: number
    wallet_address: string
    stablecoin?: 'USDT' | 'USDC'
  }) => {
    setState(s => ({ ...s, step: 'requesting', error: null }))
    try {
      const req = await api.post<{ success: boolean; data: any }>('/mcc/mining/request', params)
      setState(s => ({ ...s, step: 'confirming', requestData: req.data }))
      return req.data
    } catch (e: any) {
      setState(s => ({ ...s, step: 'error', error: e.message }))
      throw e
    }
  }, [api])

  const confirmMining = useCallback(async (requestId: string, txSignature: string) => {
    setState(s => ({ ...s, step: 'signing' }))
    try {
      const res = await api.post<{ success: boolean; data: any }>('/mcc/mining/confirm', { request_id: requestId, tx_signature: txSignature })
      setState(s => ({ ...s, step: 'completed', confirmData: res.data, txSignature }))
      return res.data
    } catch (e: any) {
      setState(s => ({ ...s, step: 'error', error: e.message }))
      throw e
    }
  }, [api])

  return { ...state, startMining, confirmMining, reset }
}
