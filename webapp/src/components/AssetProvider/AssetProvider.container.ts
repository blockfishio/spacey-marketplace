import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../../modules/reducer'
import { fetchAssetRequest, FETCH_ASSET_REQUEST } from '../../modules/asset/actions'
// import { fetchAssetsRequest,FETCH_ASSETS_REQUEST} from '../../modules/asset/actions'
// import {
//   getTokenId,
//   getLoading,
//   getData as getNFTs
// } from '../../modules/nft/selectors'
import {
  getData as getAssets,
  getLoading,
  getOwnerAssetOptionId
} from '../../modules/asset/selectors'
// import { getData as getOrders } from '../../modules/order/selectors'
// import { getNFT } from '../../modules/nft/utils'
import { getAsset } from '../../modules/asset/utils'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
  OwnProps
} from './AssetProvider.types'
import NFTProvider from './AssetProvider'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  console.log(ownProps.optionId)
  const optionId = ownProps.optionId || getOwnerAssetOptionId(state)
  const assets = getAssets(state)
  const asset = getAsset(optionId, assets)

  return {
    optionId,
    asset,
    isLoading: isLoadingType(getLoading(state), FETCH_ASSET_REQUEST)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFetchAsset: (optionId: string) =>
    dispatch(fetchAssetRequest(optionId))
})

const mergeProps = (
  stateProps: MapStateProps,
  dispatchProps: MapDispatchProps,
  ownProps: OwnProps
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(mapState, mapDispatch, mergeProps)(NFTProvider)
