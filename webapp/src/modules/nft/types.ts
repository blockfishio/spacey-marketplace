import { Parcel } from './parcel/types'
import { Estate } from './estate/types'
import { Wearable, WearableRarity } from './wearable/types'
import { ENS } from './ens/types'
import { View } from '../ui/types'
import { NFTsFetchFilters } from '../vendor/nft/types'
import { Vendors } from '../vendor/types'
import { SortDirection } from '../routing/types'
import { Boardingpass } from './boardingpass/types'
import { Building } from './building/types'
import { Land } from './land/types'
import { Tower, TowerDetail } from './tower/types'
import { Trap } from './trap/types'
import { Network } from '@dcl/schemas'

export enum NFTSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  ORDER_CREATED_AT = 'searchOrderCreatedAt',
  PRICE = 'searchOrderPrice'
}

export enum NFTCategory {
  PARCEL = 'parcel',
  ESTATE = 'estate',
  WEARABLE = 'wearable',
  ENS = 'ens',
  ART = 'art',
  BOARDNGPASS = 'boardingpass',
  CHEST = 'chest',
  LAND = 'land',
  BUILDING = 'building',
  TOWER = 'tower',
  TRAP = 'trap'
}

// TODO: Move this to their own vendor folders
export type DecentralandNFT = {
  boardingpass?: Boardingpass,
  land?: Land,
  building?: Building,
  tower?: Tower,
  trap?: Trap,
  parcel?: Parcel,
  estate?: Estate,
  ens?: ENS,
  wearable?: Wearable
}
export type SuperRareNFT = { description: string }
export type MakersPlaceNFT = { description: string }
export type KnownOriginNFT = { description: string; isEdition: boolean }

export type Data<V extends Vendors> = V extends Vendors.DECENTRALAND
  ? DecentralandNFT

  : V extends void
  ? DecentralandNFT
  : never

export type NFT<V extends Vendors = Vendors.DECENTRALAND> = {
  id: string
  contractAddress: string
  tokenId: string
  activeOrderId: string | null
  owner: string
  name: string
  category: NFTCategory
  subcategory?: string
  image: string
  thumbnail?: string
  url: string
  vendor: Vendors
  data: Data<V>
  network?: Network
  detail?: TowerDetail
}

export type NFTsFetchParams = {
  first: number
  skip: number
  orderBy?: NFTSortBy
  orderDirection?: SortDirection
  category?: NFTCategory
  address?: string
  onlyOnSale?: boolean
  search?: string
  rarities?: WearableRarity[]
}

export type NFTsCountParams = Omit<NFTsFetchParams, 'first' | 'skip'>

export type NFTsFetchOptions = {
  vendor: Vendors
  view: View
  params: NFTsFetchParams
  filters?: NFTsFetchFilters
}
