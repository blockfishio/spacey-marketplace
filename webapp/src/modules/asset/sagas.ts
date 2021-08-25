import { takeEvery, call, put } from 'redux-saga/effects'
import {
  FETCH_ASSETS_REQUEST,
  FetchAssetsRequestAction,
  fetchAssetsSuccess,
  fetchAssetsFailure,
  FETCH_ASSET_REQUEST,
  FetchAssetRequestAction,
  fetchAssetSuccess,
  fetchAssetFailure,
} from './actions'
import { VendorFactory } from '../vendor/VendorFactory'
// import { contractVendors } from '../contract/utils'
import { AwaitFn } from '../types'
import { Vendors } from '../vendor'
// import { AssetCategory } from './types'
// import { View } from '../ui/types'
// import { NFTCategory } from '../nft/types'


export function* assetSaga() {
  yield takeEvery(FETCH_ASSETS_REQUEST, handleFetchAssetsRequest)
  yield takeEvery(FETCH_ASSET_REQUEST, handleFetchAssetRequest)
  // yield takeEvery(TRANSFER_NFT_REQUEST, handleTransferNFTRequest)
}

function* handleFetchAssetsRequest(action: FetchAssetsRequestAction): any {
  const { options, timestamp } = action.payload
  const { params } = options
  // console.log(view, view == View.OFFICAL)
  try {
    const { assetService } = VendorFactory.build(Vendors.DECENTRALAND)
    if (assetService) {
      const [
        assets
      ]: AwaitFn<typeof assetService.fetch> = yield call(() =>
        // TODO: This `as any` is here because Typescript joins (&) filter types instead of adding them as an or (|)
        assetService.fetch(params)
      )
      // if (view == View.OFFICAL) {
      yield put(
        fetchAssetsSuccess(options, assets, assets.length, timestamp))
      // }
      // else {

      //   yield put(fetchAssetsSuccess(options, [], 0, timestamp))
      // }

    }
  } catch (error) {
    yield put(fetchAssetsFailure(options, error.message, timestamp))
  }
}

function* handleFetchAssetRequest(action: FetchAssetRequestAction) {
  const { optionId } = action.payload
  try {

    const { assetService } = VendorFactory.build(Vendors.DECENTRALAND)
    if (assetService) {
      const [asset]: AwaitFn<typeof assetService.fetchOne> = yield call(() =>
        assetService.fetchOne(optionId))
      yield put(fetchAssetSuccess(asset))

    }

    // const [nft, order]: AwaitFn<typeof nftService.fetchOne> = yield call(() =>
    //   nftService.fetchOne(contractAddress, tokenId)
    // )

  } catch (error) {
    yield put(fetchAssetFailure(optionId, error.message))
  }
}


