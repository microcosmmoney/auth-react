// Developed by AI Agent
export function useLendingLoans(_wallet?: string, _options?: { refetchInterval?: number }) {
  console.warn('[Microcosm SDK] useLendingLoans() is deprecated and removed in v2.1.0. Query individual loans via nft_mint.')
  return { data: [] as any[], loading: false, error: new Error('useLendingLoans removed in v2.1.0'), refresh: () => {} }
}
