
import { View } from '../ui/types'
// import { NFTsFetchFilters } from '../vendor/nft/types'
import { Vendors } from '../vendor/types'
import { NFTCategory } from '../nft/types'
// import { SortDirection } from '../routing/types'

export enum NFTSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  ORDER_CREATED_AT = 'searchOrderCreatedAt',
  PRICE = 'searchOrderPrice'
}

export enum AssetCategory {
  CHEST = 'Chest',
  ALL = 'All',
  HIDE = 'Hide'
}

// TODO: Move this to their own vendor folders
export type DecentralandAsset = {

}

export type Data<V extends Vendors> = V extends Vendors.DECENTRALAND
  ? DecentralandAsset
  : V extends void
  ? DecentralandAsset
  : never

export type Asset = {
  Category: AssetCategory
  ImageURL: string
  Price: string
  PriceUnit: string
  OptionID: string
}

export type AssetsFetchParams = {

  category?: AssetCategory | NFTCategory

}

export type AssetsFetchOptions = {
  vendor: Vendors,
  view?: View,
  params: AssetsFetchParams
}