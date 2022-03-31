import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ChainId } from '../contract/types'
import {
  CLAIM_METAMARS_REQUEST,
  ClaimMetamarsRequestAction,
  claimMetamarsFailure,
  claimMetamarsSuccess,
  fetchClaimableSuccess,
  fetchClaimableFailure,
} from './actions'

import {
  FETCH_WALLET_REQUEST,
  FetchWalletRequestAction,
  CHANGE_NETWORK,
  CHANGE_ACCOUNT
} from 'spacey-dapps/dist/modules/wallet/actions'
import { getAddress, getChainId } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'
import { Vendors } from '../vendor'
import { fetchClaimable } from './utils'
import { Claimable } from './types'

export function* claimSaga() {
  yield takeEvery(CLAIM_METAMARS_REQUEST, handleClaimMetamarsRequest)
  yield takeEvery(FETCH_WALLET_REQUEST, handleFetchClaimableRequest)
  yield takeEvery(CHANGE_NETWORK, handleFetchClaimableRequest)
  yield takeEvery(CHANGE_ACCOUNT, handleFetchClaimableRequest)

}

function* handleClaimMetamarsRequest(action: ClaimMetamarsRequestAction) {
  const { amount } = action.payload
  try {
    const { claimMetamarsService } = VendorFactory.build(Vendors.DECENTRALAND)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(() =>
      claimMetamarsService?.claim(amount, address!, chainId)
    )
    yield put(claimMetamarsSuccess(amount, chainId, txHash))
    yield put(push(locations.settings()))
  } catch (error) {
    //@ts-ignore
    yield put(claimMetamarsFailure(amount, error.message))
  }
}

function* handleFetchClaimableRequest(_action: FetchWalletRequestAction) {
  try {
    const claimable: Claimable = yield call(fetchClaimable)
    yield put(fetchClaimableSuccess(claimable))
  } catch (error) {
    //@ts-ignore
    yield put(fetchClaimableFailure(error.message))
  }
}


