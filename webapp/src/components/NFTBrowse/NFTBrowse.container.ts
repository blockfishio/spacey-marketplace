import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'

import { RootState } from '../../modules/reducer'
import { setView } from '../../modules/ui/actions'
import { browse, fetchNFTsFromRoute, fetchAssetsFromRoute } from '../../modules/routing/actions'
import { FETCH_NFTS_REQUEST } from '../../modules/nft/actions'
import { getLoading } from '../../modules/nft/selectors'
import {
  getIsFullscreen,
  // getIsMap,
  getOnlyOnSale
} from '../../modules/routing/selectors'
import { MapDispatch, MapDispatchProps, MapStateProps } from './NFTBrowse.types'
import NFTBrowse from './NFTBrowse'

const mapState = (state: RootState): MapStateProps => ({
  // isMap: getIsMap(state),
  isMap: false,
  isFullscreen: getIsFullscreen(state),
  showOnSale: getOnlyOnSale(state),
  isLoading: isLoadingType(getLoading(state), FETCH_NFTS_REQUEST)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSetView: view => dispatch(setView(view)),
  onFetchNFTsFromRoute: options => dispatch(fetchNFTsFromRoute(options)),
  onFetchAssetsFromRoute: options => dispatch(fetchAssetsFromRoute(options)),
  onBrowse: options => dispatch(browse(options))
})

export default connect(mapState, mapDispatch)(NFTBrowse)
