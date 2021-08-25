import { gql } from 'apollo-boost'

import { NFT } from '../../../nft/types'
import { Parcel } from '../../../nft/parcel/types'
import { Estate } from '../../../nft/estate/types'
import { Wearable } from '../../../nft/wearable/types'
import { ENS } from '../../../nft/ens/types'
import { orderFields, OrderFields } from '../order/fragments'
import { Boardingpass } from '../../../nft/boardingpass/types'
import { Building } from '../../../nft/building/types'
import { Land } from '../../../nft/land/types'
import { Tower } from '../../../nft/tower/types'
import { Trap } from '../../../nft/trap/types'

export const nftFields = () => gql`
  fragment nftFields on NFT {
    id
    name
    contractAddress
    tokenId
    category
    image
    thumbnail
    owner {
      address
    }
    boardingpass {
      id
      description
    }
    land {
      id
      x
      y
      description
    }
    building {
      id
      description
      rarity
    }
    tower {
      id
      description
      rarity
    }
    trap {
      id
      description
      rarity
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
  land?: Land
  building?: Building
  tower?: Tower
  trap?: Trap

}
export type NFTFragment = Omit<NFTFields, 'vendor'> & {
  activeOrder: OrderFields | null
}
