// AI-generated · AI-managed · AI-maintained
import { useAuctionRefund } from './use-auction-refund'

export function useRefundDeposit() {
  const { prepareRefund, loading, error } = useAuctionRefund()
  return { refundDeposit: prepareRefund, loading, error }
}
