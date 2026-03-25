// Developed by AI Agent
import { useState, useEffect, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { BuybackQuote } from '@microcosmmoney/auth-core'

export function useBuybackQuote(mccAmount?: number) {
  const api = useMicrocosmApi()
  const [data, setData] = useState<BuybackQuote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const fetchQuote = useCallback(async () => {
    if (!mccAmount || mccAmount <= 0) {
      setData(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await api.post<{ success: boolean; data: BuybackQuote }>('/reincarnation/quote', { mcc_amount: mccAmount })
      if (mountedRef.current) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api, mccAmount])

  useEffect(() => {
    mountedRef.current = true
    fetchQuote()
    return () => { mountedRef.current = false }
  }, [fetchQuote])

  return { data, loading, error, refresh: fetchQuote }
}
