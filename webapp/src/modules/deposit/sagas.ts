import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ChainId } from '../contract/types'
import {
  DEPOSIT_GMARS_REQUEST,
  DepositGMarsRequestAction,
  depositGMarsFailure,
  depositGMarsSuccess,
} from './actions'
import { getAddress, getChainId } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'
import { Vendors } from '../vendor'

export function* depositSaga() {
  yield takeEvery(DEPOSIT_GMARS_REQUEST, handleDepositGMarsRequest)

}

function* handleDepositGMarsRequest(action: DepositGMarsRequestAction) {
  const { amount } = action.payload
  try {
    const { claimMetamarsService } = VendorFactory.build(Vendors.DECENTRALAND)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)
    const txHash: string = yield call(() =>
      claimMetamarsService?.deposit(amount, address!)
    )
    yield put(depositGMarsSuccess(amount, chainId, txHash))
    yield put(push(locations.settings()))
  } catch (error) {
    yield put(depositGMarsFailure(amount, error.message))
  }
}


