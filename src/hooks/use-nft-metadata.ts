import { useApiQuery } from './use-api-query'

export interface NFTCollectionMetadata {
  name: string
  symbol: string
  description: string
  image: string
  external_url: string
}

export interface TerritoryNFTMetadata {
  name: string
  symbol: string
  description: string
  image: string
  attributes: Array<{ trait_type: string; value: string | number }>
  properties?: Record<string, any>
}

export function useNFTCollectionMetadata(options?: { refetchInterval?: number }) {
  return useApiQuery<NFTCollectionMetadata>({
    path: '/nft/metadata/collection.json',
    requireAuth: false,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}

export function useTerritoryNFTMetadata(territoryId?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<TerritoryNFTMetadata>({
    path: `/nft/metadata/${territoryId}.json`,
    requireAuth: false,
    skip: !territoryId,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
