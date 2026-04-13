// DEPRECATED: Removed in v2.1.0 — native contract has no UserPosition concept.
// Use useLendingLPBalance() for deposit tracking, loan lookup via nft_mint.
export function useLendingPosition(_wallet?: string, _options?: { refetchInterval?: number }) {
  console.warn('[Microcosm SDK] useLendingPosition() is deprecated and removed in v2.1.0. Use useLendingLPBalance() instead.')
  return { data: null, loading: false, error: new Error('useLendingPosition removed in v2.1.0'), refresh: () => {} }
}
