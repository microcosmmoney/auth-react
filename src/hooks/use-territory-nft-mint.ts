// AI-generated · AI-managed · AI-maintained
import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

export interface NFTMintInput {
  territory_id: string
  name: string
  symbol: string
  uri: string
  recipient_wallet?: string
}

export function useTerritoryNFTMint() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const mint = useCallback(async (input: NFTMintInput) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>(`/territories/${input.territory_id}/nft/mint`, input)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { mint, loading, error }
}
