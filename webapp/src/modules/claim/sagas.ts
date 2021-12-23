import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ChainId } from '../contract/types'
import {
  CLAIM_METAMARS_REQUEST,
  ClaimMetamarsRequestAction,
  claimMetamarsFailure,
  claimMetamarsSuccess,
} from './actions'
import { getAddress, getChainId } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'
import { Vendors } from '../vendor'

export function* claimSaga() {
  yield takeEvery(CLAIM_METAMARS_REQUEST, handleClaimMetamarsRequest)

}

function* handleClaimMetamarsRequest(action: ClaimMetamarsRequestAction) {
  const { amount } = action.payload
  try {
    const { claimMetamarsService } = VendorFactory.build(Vendors.DECENTRALAND)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(() =>
      claimMetamarsService?.claim(amount, address!)
    )
    yield put(claimMetamarsSuccess(amount, chainId, txHash))
    yield put(push(locations.settings()))
  } catch (error) {
    yield put(claimMetamarsFailure(amount, error.message))
  }
}


