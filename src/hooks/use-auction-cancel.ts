// Developed by AI Agent
import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export function useAuctionCancel() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const prepareCancelBid = useCallback(async (auctionId: number): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/auction-solana/bid/cancel/prepare', { auction_id: auctionId })
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { prepareCancelBid, loading, error }
}
