import { ChainId, Network } from '@spacey2025/schemas'


export type Networks = Record<Network, NetworkData>
export type NetworkData = {
  claimable: number
  chainId: ChainId
}

export interface Claimable {
  address: string
  networks: Networks
  network: Network
  chainId: ChainId
}