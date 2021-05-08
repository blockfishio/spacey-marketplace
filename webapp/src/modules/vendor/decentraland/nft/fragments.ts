import { gql } from 'apollo-boost'

import { NFT } from '../../../nft/types'
import { Parcel } from '../../../nft/parcel/types'
import { Estate } from '../../../nft/estate/types'
import { Wearable } from '../../../nft/wearable/types'
import { ENS } from '../../../nft/ens/types'
import { orderFields, OrderFields } from '../order/fragments'
import { Boardingpass } from '../../../nft/boardingpass/types'

export const nftFields = () => gql`
  fragment nftFields on NFT {
    id
    name
    image
    contractAddress
    tokenId
    category
    owner {
      address
    }
    parcel {
      x
      y
      data {
        description
      }
    }
    estate {
      size
      parcels {
        x
        y
      }
      data {
        description
      }
    }
    wearable {
      description
      category
      rarity
      bodyShapes
    }
    ens {
      subdomain
    }
    boardingpass {
      id
    }
  }
`

export const nftFragment = () => gql`
  fragment nftFragment on NFT {
    ...nftFields
    activeOrder(size_gt: 0) {
      ...orderFields
    }
  }
  ${nftFields()}
  ${orderFields()}
`

export type NFTFields = Omit<NFT, 'activeOrderId' | 'owner'> & {
  owner: { address: string }
  parcel?: Parcel
  estate?: Estate
  wearable?: Wearable
  ens?: ENS
  boardingpass?: Boardingpass
}
export type NFTFragment = Omit<NFTFields, 'vendor'> & {
  activeOrder: OrderFields | null
}
