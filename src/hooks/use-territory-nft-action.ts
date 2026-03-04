// AI-generated · AI-managed · AI-maintained
import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export function useTerritoryNFTAction() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const transferNFT = useCallback(async (params: {
    territory_id: string
    nft_mint: string
    to_wallet: string
    tx_signature?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>(`/territories/${params.territory_id}/nft/transfer`, params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const burnNFT = useCallback(async (params: {
    territory_id: string
    nft_mint: string
    tx_signature?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>(`/territories/${params.territory_id}/nft/burn`, params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { transferNFT, burnNFT, loading, error }
}
