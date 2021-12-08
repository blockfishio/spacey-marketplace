
import { Network } from '@dcl/schemas'
import { ContractName } from '../ContractService'
import { NFT } from '../../../nft/types'
import { Order } from '../../../order/types'
import { Vendors } from '../../../vendor/types'


export type NFTsFetchFilters = {
  isLand?: boolean,
  isOffical?: boolean,
  contracts?: ContractName[]
  network?: Network
}

export type NFTData = {
  land?: {
    id: string;
    x: string;
    y: string;
  }
  tower?: {
    description: string;
    id: string;
  }
  parcel?: {
    x: string;
    y: string;
    description: string | null;
    estate: {
      tokenId: string;
      name: string;
    } | null;
  };
  estate?: {
    size: number;
    parcels: {
      x: number;
      y: number;
    }[];
    description: string | null;
  };

  ens?: {
    subdomain: string;
  };
}

export type NFTResult = {
  nft: Omit<NFT<Vendors.DECENTRALAND>, 'vendor'>
  order: Order | null
}

export type NFTResponse = {
  data: NFTResult[]
  total: number
}
