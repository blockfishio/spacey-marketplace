import { takeEvery, call, put } from 'redux-saga/effects'
import {
  FETCH_OWNERASSETS_REQUEST,
  FetchOwnerAssetsRequestAction,
  fetchOwnerAssetsSuccess,
  fetchOwnerAssetsFailure
} from './actions'
import { VendorFactory } from '../vendor/VendorFactory'
// import { contractVendors } from '../contract/utils'
import { AwaitFn } from '../types'
import { Vendors } from '../vendor'
// import { AssetCategory } from './types'
// import { View } from '../ui/types'
// import { NFTCategory } from '../nft/types'


export function* ownerassetSaga() {
  yield takeEvery(FETCH_OWNERASSETS_REQUEST, handleFetchOwnerAssetRequest)
}



function* handleFetchOwnerAssetRequest(action: FetchOwnerAssetsRequestAction): any {
  const { timestamp, options } = action.payload
  try {
    const { ownerassetService } = VendorFactory.build(Vendors.DECENTRALAND)
    if (ownerassetService) {
      const [
        ownerchests,
        ownerassets
      ]: AwaitFn<typeof ownerassetService.fetch> = yield call(() =>
        // TODO: This `as any` is here because Typescript joins (&) filter types instead of adding them as an or (|)
        ownerassetService.fetch(options)
      )
      // if (view == View.OFFICAL) {
      yield put(
        fetchOwnerAssetsSuccess(options, ownerchests, ownerassets, ownerchests.length + ownerassets.length, timestamp))
      // }
      // else {

      //   yield put(fetchAssetsSuccess(options, [], 0, timestamp))
      // }

    }
  } catch (error) {
    yield put(fetchOwnerAssetsFailure(options, error.message, timestamp))
  }

}