import { Dispatch } from 'redux'

import { NFT } from '../../modules/nft/types'
import { Asset } from '../../modules/asset/types'
import { Vendors } from '../../modules/vendor/types'
import { browse, BrowseAction } from '../../modules/routing/actions'

export type Props = {
  vendor: Vendors
  nfts: NFT[]
  assets: Asset[]
  page: number
  count?: number
  isLoading: boolean
  onBrowse: typeof browse
}

export type MapStateProps = Pick<
  Props,
  'vendor' | 'nfts' | 'page' | 'count' | 'isLoading' | 'assets'
>
export type MapDispatchProps = Pick<Props, 'onBrowse'>
export type MapDispatch = Dispatch<BrowseAction>
