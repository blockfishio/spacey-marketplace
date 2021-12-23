import { Dispatch } from 'redux'
import React from 'react'
// import { NFT } from '../../modules/nft/types'
import { Asset } from '../../modules/asset/types'
// import {
//   fetchNFTRequest,
//   FetchNFTRequestAction
// } from '../../modules/nft/actions'
import {

  fetchAssetRequest,
  FetchAssetRequestAction
} from '../../modules/asset/actions'
// import { Order } from '../../modules/order/types'

export type Props = {
  // contractAddress: string | null
  optionId: string | null
  asset: Asset | null
  // order: Order | null
  isLoading: boolean
  onFetchAsset: typeof fetchAssetRequest

  children: (
    asset: Asset | null,
    // order: Order | null,
    isLoading: boolean
  ) => React.ReactNode | null
}

export type MapStateProps = Pick<
  Props,
  'asset' | 'optionId' | 'isLoading'
>
export type MapDispatchProps = Pick<Props, 'onFetchAsset'>
export type MapDispatch = Dispatch<FetchAssetRequestAction>
export type OwnProps = Partial<Pick<Props, 'optionId'>>
