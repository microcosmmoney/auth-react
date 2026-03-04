// AI-generated · AI-managed · AI-maintained
import { useState, useCallback } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export type BuybackFlowStep = 'idle' | 'quoting' | 'executing' | 'signing' | 'completed' | 'error'

export interface BuybackFlowState {
  step: BuybackFlowStep
  quote: any | null
  result: any | null
  txSignature: string | null
  error: string | null
}

export function useBuybackFlow() {
  const api = useMicrocosmApi()
  const [state, setState] = useState<BuybackFlowState>({
    step: 'idle',
    quote: null,
    result: null,
    txSignature: null,
    error: null,
  })

  const reset = useCallback(() => {
    setState({ step: 'idle', quote: null, result: null, txSignature: null, error: null })
  }, [])

  const getQuote = useCallback(async (params: {
    amount: number
    wallet_address: string
    stablecoin?: 'USDT' | 'USDC'
  }) => {
    setState(s => ({ ...s, step: 'quoting', error: null }))
    try {
      const q = await api.post<{ success: boolean; data: any }>('/mcc/buyback/quote', params)
      setState(s => ({ ...s, step: 'executing', quote: q.data }))
      return q.data
    } catch (e: any) {
      setState(s => ({ ...s, step: 'error', error: e.message }))
      throw e
    }
  }, [api])

  const executeBuyback = useCallback(async (quoteId: string, txSignature: string) => {
    setState(s => ({ ...s, step: 'signing' }))
    try {
      const res = await api.post<{ success: boolean; data: any }>('/mcc/buyback/execute', { quote_id: quoteId, tx_signature: txSignature })
      setState(s => ({ ...s, step: 'completed', result: res.data, txSignature }))
      return res.data
    } catch (e: any) {
      setState(s => ({ ...s, step: 'error', error: e.message }))
      throw e
    }
  }, [api])

  return { ...state, getQuote, executeBuyback, reset }
}
