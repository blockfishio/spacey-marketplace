import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'

import { RootState } from '../../modules/reducer'
import { FETCH_NFTS_REQUEST } from '../../modules/nft/actions'
import { FETCH_ASSETS_REQUEST } from '../../modules/asset/actions'
import { browse } from '../../modules/routing/actions'
import { getNFTs, getCount as getNFTCount, getView } from '../../modules/ui/nft/browse/selectors'
import { getAssets, getCount as getAssetCount } from '../../modules/ui/asset/browse/selectors'
import { getVendor, getPage } from '../../modules/routing/selectors'
import { getLoading as getNFTLoading } from '../../modules/nft/selectors'
import { getLoading as getAssetLoading } from '../../modules/asset/selectors'
import { MapStateProps, MapDispatch, MapDispatchProps } from './NFTList.types'
import NFTList from './NFTList'

const mapState = (state: RootState): MapStateProps => ({
  viewInState: getView(state),
  vendor: getVendor(state),
  nfts: getNFTs(state),
  assets: getAssets(state),
  page: getPage(state),
  count: getNFTCount(state)! + getAssetCount(state)!,
  isLoading: isLoadingType(getNFTLoading(state), FETCH_NFTS_REQUEST) || isLoadingType
    (getAssetLoading(state), FETCH_ASSETS_REQUEST)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onBrowse: options => dispatch(browse(options))
})

export default connect(mapState, mapDispatch)(NFTList)
