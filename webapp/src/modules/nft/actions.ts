import { action } from 'typesafe-actions'
import { ChainId } from '@dcl/schemas'
import { buildTransactionPayload } from 'decentraland-dapps/dist/modules/transaction/utils'

import { SortDirection } from '../routing/types'
import { Order } from '../order/types'
import { Account } from '../account/types'
import { getNFTName } from './utils'
import { NFT, NFTSortBy, NFTsFetchOptions, NFTsFetchParams } from './types'
import { TowerDetail } from './tower/types'

// Fetch NFTs

export const FETCH_NFTS_REQUEST = '[Request] Fetch NFTs'
export const FETCH_NFTS_SUCCESS = '[Success] Fetch NFTs'
export const FETCH_NFTS_FAILURE = '[Failure] Fetch NFTs'

export const DEFAULT_BASE_NFT_PARAMS: NFTsFetchParams = {
  first: 24,
  skip: 0,
  orderBy: NFTSortBy.CREATED_AT,
  orderDirection: SortDirection.DESC,
  onlyOnSale: false
}

export const fetchNFTsRequest = (options: NFTsFetchOptions) =>
  action(FETCH_NFTS_REQUEST, {
    options,
    timestamp: Date.now()
  })

export const fetchNFTsSuccess = (
  options: NFTsFetchOptions,
  nfts: NFT[],
  accounts: Account[],
  orders: Order[],
  count: number,
  timestamp: number
) =>
  action(FETCH_NFTS_SUCCESS, {
    options,
    nfts,
    accounts,
    orders,
    count,
    timestamp
  })
export const fetchNFTsFailure = (
  options: NFTsFetchOptions,
  error: string,
  timestamp: number
) => action(FETCH_NFTS_FAILURE, { options, error, timestamp })

export type FetchNFTsRequestAction = ReturnType<typeof fetchNFTsRequest>
export type FetchNFTsSuccessAction = ReturnType<typeof fetchNFTsSuccess>
export type FetchNFTsFailureAction = ReturnType<typeof fetchNFTsFailure>

// Fetch NFT

export const FETCH_NFT_REQUEST = '[Request] Fetch NFT'
export const FETCH_NFT_SUCCESS = '[Success] Fetch NFT'
export const FETCH_NFT_FAILURE = '[Failure] Fetch NFT'

export const fetchNFTRequest = (contractAddress: string, tokenId: string) =>
  action(FETCH_NFT_REQUEST, { contractAddress, tokenId })
export const fetchNFTSuccess = (nft: NFT, order?: Order) =>
  action(FETCH_NFT_SUCCESS, { nft, order })
export const fetchNFTFailure = (
  contractAddress: string,
  tokenId: string,
  error: string
) => action(FETCH_NFT_FAILURE, { contractAddress, tokenId, error })

export type FetchNFTRequestAction = ReturnType<typeof fetchNFTRequest>
export type FetchNFTSuccessAction = ReturnType<typeof fetchNFTSuccess>
export type FetchNFTFailureAction = ReturnType<typeof fetchNFTFailure>

// Transfer NFT

export const TRANSFER_NFT_REQUEST = '[Request] Transfer NFT'
export const TRANSFER_NFT_SUCCESS = '[Success] Transfer NFT'
export const TRANSFER_NFT_FAILURE = '[Failure] Transfer NFT'

export const transferNFTRequest = (nft: NFT, address: string) =>
  action(TRANSFER_NFT_REQUEST, { nft, address })
export const transferNFTSuccess = (
  nft: NFT,
  address: string,
  chainId: ChainId,
  txHash: string
) =>
  action(TRANSFER_NFT_SUCCESS, {
    nft,
    address,
    ...buildTransactionPayload(chainId, txHash, {
      tokenId: nft.tokenId,
      contractAddress: nft.contractAddress,
      name: getNFTName(nft),
      address
    })
  })
export const transferNFTFailure = (nft: NFT, address: string, error: string) =>
  action(TRANSFER_NFT_FAILURE, { nft, address, error })

export type TransferNFTRequestAction = ReturnType<typeof transferNFTRequest>
export type TransferNFTSuccessAction = ReturnType<typeof transferNFTSuccess>
export type TransferNFTFailureAction = ReturnType<typeof transferNFTFailure>

//Rename NFT
export const RENAME_NFT_REQUEST = '[Request] Rename NFT'
export const RENAME_NFT_SUCCESS = '[Success] Rename NFT'
export const RENAME_NFT_FAILURE = '[Failure] Rename NFT'

export const renameNFTRequest = (nft: NFT, ownername: string) =>
  action(RENAME_NFT_REQUEST, { nft, ownername })
export const renameNFTSuccess = (
  nft: NFT,
  ownername: string,
  chainId: ChainId,
  txHash: string
) =>
  action(RENAME_NFT_SUCCESS, {
    nft,
    ownername,
    ...buildTransactionPayload(chainId, txHash, {
      tokenId: nft.tokenId,
      contractAddress: nft.contractAddress,
      name: getNFTName(nft),
      ownername
    })
  })
export const renameNFTFailure = (nft: NFT, ownername: string, error: string) =>
  action(RENAME_NFT_FAILURE, { nft, ownername, error })

export type RenameNFTRequestAction = ReturnType<typeof renameNFTRequest>
export type RenameNFTSuccessAction = ReturnType<typeof renameNFTSuccess>
export type RenameNFTFailureAction = ReturnType<typeof renameNFTFailure>




//fetch Tower Detail
export const FETCH_TOWERDETAIL_REQUEST = '[Request] Fetch Tower Detail'
export const FETCH_TOWERDETAIL_SUCCESS = '[Success] Fetch Tower Detail'
export const FETCH_TOWERDETAIL_FAILURE = '[Failure] Fetch Tower Detail'
export const fetchTowerDetailRequest = (
  nft: NFT) =>
  action(FETCH_TOWERDETAIL_REQUEST, { nft })
export const fetchTowerDetailSuccess = (nft: NFT, towerdetail: TowerDetail) =>
  action(FETCH_TOWERDETAIL_SUCCESS, { nft, towerdetail })
export const fetchTowerDetailFailure = (
  nft: NFT,
  error: string
) => action(FETCH_TOWERDETAIL_FAILURE, { nft, error })

export type FetchTowerDetailRequestAction = ReturnType<typeof fetchTowerDetailRequest>
export type FetchTowerDetailSuccessAction = ReturnType<typeof fetchTowerDetailSuccess>
export type FetchTowerDetailFailureAction = ReturnType<typeof fetchTowerDetailFailure>