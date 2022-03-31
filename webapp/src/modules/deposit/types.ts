import { ChainId, Network } from '@spacey2025/schemas'


export type Networks = Record<Network, NetworkData>
export type NetworkData = {
  balance: number
  chainId: ChainId
}

export interface Metamars {
  address: string
  networks: Networks
  network: Network
  chainId: ChainId
}