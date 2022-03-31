// import { NFTCategory } from '../nft/types'
import { ChainId, Network } from '@spacey2025/schemas'
export enum OrderStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled'
}

export type Order = {
  id: string
  marketAddress: string
  contractAddress: string
  tokenId: string
  owner: string
  buyer: string | null
  price: string
  ethPrice?: string
  status: OrderStatus
  expiresAt: number
  createdAt: number
  updatedAt: number
  network: Network
  chainId: ChainId
}

export type ChestOrder = {
  price: string
  optionID: string
  network?: Network
  chainId?: ChainId
}
