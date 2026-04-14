import { useState, useCallback, useEffect } from 'react'

export interface SolanaWalletState {
  connected: boolean
  publicKey: string | null
  connecting: boolean
  error: string | null
}

export function useSolanaWallet() {
  const [state, setState] = useState<SolanaWalletState>({
    connected: false,
    publicKey: null,
    connecting: false,
    error: null,
  })

  useEffect(() => {
    const sol = (window as any).solana
    if (sol?.isPhantom && sol.isConnected && sol.publicKey) {
      setState({ connected: true, publicKey: sol.publicKey.toString(), connecting: false, error: null })
    }
  }, [])

  const connect = useCallback(async () => {
    const sol = (window as any).solana
    if (!sol?.isPhantom) {
      setState(s => ({ ...s, error: 'Phantom wallet not found' }))
      return null
    }
    setState(s => ({ ...s, connecting: true, error: null }))
    try {
      const resp = await sol.connect()
      const pk = resp.publicKey.toString()
      setState({ connected: true, publicKey: pk, connecting: false, error: null })
      return pk
    } catch (e: any) {
      setState(s => ({ ...s, connecting: false, error: e.message }))
      return null
    }
  }, [])

  const disconnect = useCallback(async () => {
    const sol = (window as any).solana
    if (sol) await sol.disconnect()
    setState({ connected: false, publicKey: null, connecting: false, error: null })
  }, [])

  const signTransaction = useCallback(async (transaction: any) => {
    const sol = (window as any).solana
    if (!sol) throw new Error('Wallet not available')
    return sol.signTransaction(transaction)
  }, [])

  const signAllTransactions = useCallback(async (transactions: any[]) => {
    const sol = (window as any).solana
    if (!sol) throw new Error('Wallet not available')
    return sol.signAllTransactions(transactions)
  }, [])

  return { ...state, connect, disconnect, signTransaction, signAllTransactions }
}
