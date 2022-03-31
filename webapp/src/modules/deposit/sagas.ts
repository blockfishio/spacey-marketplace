import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ChainId } from '../contract/types'
import {
  DEPOSIT_GMARS_REQUEST,
  DepositGMarsRequestAction,
  depositGMarsFailure,
  depositGMarsSuccess,
  balanceMetamarsSuccess,
} from './actions'
import { getAddress, getChainId } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'
import { Vendors } from '../vendor'
import { CHANGE_ACCOUNT, CHANGE_NETWORK, FetchWalletRequestAction, FETCH_WALLET_REQUEST } from 'spacey-dapps/dist/modules/wallet/actions'
import { Metamars } from './types'
import { fetchMetamars } from './utils'

export function* depositSaga() {
  yield takeEvery(DEPOSIT_GMARS_REQUEST, handleDepositGMarsRequest)
  yield takeEvery(FETCH_WALLET_REQUEST, handleMetamarsBalanceRequest)
  yield takeEvery(CHANGE_NETWORK, handleMetamarsBalanceRequest)
  yield takeEvery(CHANGE_ACCOUNT, handleMetamarsBalanceRequest)

}

function* handleDepositGMarsRequest(action: DepositGMarsRequestAction) {
  const { amount } = action.payload
  try {
    const { claimMetamarsService } = VendorFactory.build(Vendors.DECENTRALAND)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)
    const txHash: string = yield call(() =>
      claimMetamarsService?.deposit(amount, address!, chainId)
    )
    yield put(depositGMarsSuccess(amount, chainId, txHash))
    yield put(push(locations.settings()))
  } catch (error) {
    //@ts-ignore
    yield put(depositGMarsFailure(amount, error.message))
  }
}

function* handleMetamarsBalanceRequest(_action: FetchWalletRequestAction) {
  try {
    const metamars: Metamars = yield call(fetchMetamars)
    yield put(balanceMetamarsSuccess(metamars))
  } catch (error) {
    //@ts-ignore
    yield put(balanceMetamarsFailure(error.message))
  }
}

