import { Dispatch } from 'redux'

import { NFT } from '../../modules/nft/types'
import { Asset } from '../../modules/asset/types'
import { Vendors } from '../../modules/vendor/types'
import { browse, BrowseAction } from '../../modules/routing/actions'
import { View } from '../../modules/ui/types'

export type Props = {
  viewInState: View | undefined,
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
  'vendor' | 'nfts' | 'page' | 'count' | 'isLoading' | 'assets' | 'viewInState'
>
export type MapDispatchProps = Pick<Props, 'onBrowse'>
export type MapDispatch = Dispatch<BrowseAction>
