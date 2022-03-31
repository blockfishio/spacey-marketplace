import {
  NFT,
  NFTCategory,
  NFTsFetchParams,
  NFTsCountParams
} from '../nft/types'
import {
  AssetCount,
  AssetsFetchParams,
} from '../asset/types'
import {
  OwnerAsset, OwnerChest, OwnerAssetsFetchOptions

} from '../ownerasset/types'
import {
  Asset,
} from '../asset/types'
import { Account } from '../account/types'
import { Bid } from '../bid/types'
import { OrderStatus, Order } from '../order/types'
import { NFTsFetchFilters } from './nft/types'
import { Vendors, TransferType } from './types'
import { ChainId } from '../contract/types'
import { TowerStats, TowerDetail } from '../nft/tower/types'

export interface NFTService<V extends Vendors> {
  fetch: (
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters<V>
  ) => Promise<readonly [NFT<V>[], Account[], Order[], number]>
  count: (
    params: NFTsCountParams,
    filters?: NFTsFetchFilters<V>
  ) => Promise<number>
  fetchOne: (
    contractAddress: string,
    tokenId: string
  ) => Promise<readonly [NFT<V>, Order | undefined]>
  transfer: (
    fromAddress: string,
    toAddress: string,
    nft: NFT<V>
  ) => Promise<string>
}
export class NFTService<V> {}

export interface OrderService<V extends Vendors> {
  fetchByNFT: (nft: NFT<V>, status?: OrderStatus) => Promise<Order[]>
  create: (
    chainId: ChainId,
    nft: NFT<V>,
    price: number,
    expiresAt: number,
    fromAddress: string
  ) => Promise<string>
  execute: (
    chainId: ChainId,
    nft: NFT<V>,
    order: Order,
    fromAddress: string,
    fingerprint?: string
  ) => Promise<string>
  executeAsset?: (
    chainId: ChainId,
    asset: Asset,
    quantity: number,
    address: string,
  ) => Promise<string>
  cancel: (chainId: ChainId,
    nft: NFT<V>, fromAddress: string) => Promise<string>
  canSell(): boolean
}
export class OrderService<V> {}

export interface BidService<V extends Vendors> {
  fetchBySeller: (seller: string) => Promise<Bid[]>
  fetchByBidder: (bidder: string) => Promise<Bid[]>
  fetchByNFT: (nft: NFT<V>, status?: OrderStatus) => Promise<Bid[]>
  place: (
    nft: NFT<V>,
    price: number,
    expiresAt: number,
    fromAddress: string,
    fingerprint?: string
  ) => Promise<string>
  accept: (bid: Bid, fromAddress: string) => Promise<string>
  cancel: (bid: Bid, fromAddress: string) => Promise<string>
}
export class BidService<V> {}

export interface ContractService {
  contractAddresses: Record<string, string>
  contractAddressesAll: Record<string, Record<string, string>>
  contractSymbols: Record<string, string>
  contractSymbolsAll: Record<string, Record<string, string>>
  contractNames: Record<string, string>
  contractNamesAll: Record<string, Record<string, string>>
  contractCategories: Record<string, NFTCategory>
  contractCategoriesAll: Record<string, Record<string, string>>

  getTransferType: (address: string) => TransferType
}
export class ContractService {}


export interface AssetService {
  fetch: (params: AssetsFetchParams
  ) => Promise<readonly [Asset[]]>
  fetchOne: (
    optionId: string
  ) => Promise<readonly [Asset]>
  countAsset: (
    optionId: string
  ) => Promise<readonly [AssetCount]>
  fetchTowerstats: (
    towerkey: string
  ) => Promise<readonly [TowerStats]>
  fetchTowerDetail: (
    towerid: string
  ) => Promise<readonly [TowerDetail]>

}

export interface OwnerAssetService {
  fetch: (params: OwnerAssetsFetchOptions
  ) => Promise<readonly [OwnerChest[], OwnerAsset[]]>
  // fetchOne: (
  //   optionId: string
  // ) => Promise<readonly [Asset]>

}

export interface ClaimMetamarsService {
  claim: (amount: number,
    fromAddress: string,
    chainId: ChainId
  ) => Promise<string>
  deposit: (amount: number,
    fromAddress: string,
    chainId: ChainId
  ) => Promise<string>

}
