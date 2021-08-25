import { put, call, takeEvery, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ChainId } from '../contract/types'
import {
  CREATE_ORDER_REQUEST,
  CreateOrderRequestAction,
  createOrderFailure,
  createOrderSuccess,
  EXECUTE_ORDER_REQUEST,
  executeOrderSuccess,
  executeOrderFailure,
  ExecuteOrderRequestAction,
  CANCEL_ORDER_REQUEST,
  CancelOrderRequestAction,
  cancelOrderSuccess,
  cancelOrderFailure,
  EXECUTE_ASSETORDER_REQUEST,
  executeAssetOrderSuccess,
  executeAssetOrderFailure,
  ExecuteAssetOrderRequestAction
} from './actions'
import { getAddress, getChainId } from '../wallet/selectors'
import { locations } from '../routing/locations'
import { VendorFactory } from '../vendor/VendorFactory'
import { Vendors } from '../vendor'

export function* orderSaga() {
  yield takeEvery(CREATE_ORDER_REQUEST, handleCreateOrderRequest)
  yield takeEvery(EXECUTE_ORDER_REQUEST, handleExecuteOrderRequest)
  yield takeEvery(CANCEL_ORDER_REQUEST, handleCancelOrderRequest)
  yield takeEvery(EXECUTE_ASSETORDER_REQUEST, handleExecuteAssetOrderRequest)
}

function* handleCreateOrderRequest(action: CreateOrderRequestAction) {
  const { nft, price, expiresAt } = action.payload
  try {
    const { orderService } = VendorFactory.build(nft.vendor)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)
    const txHash: string = yield call(() =>
      orderService.create(chainId, nft, price, expiresAt, address!)
    )
    yield put(createOrderSuccess(nft, price, expiresAt, chainId, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(createOrderFailure(nft, price, expiresAt, error.message))
  }
}

function* handleExecuteOrderRequest(action: ExecuteOrderRequestAction) {
  const { order, nft, fingerprint } = action.payload
  try {
    if (nft.id !== order.nftId) {
      throw new Error('The order does not match the NFT')
    }
    const { orderService } = VendorFactory.build(nft.vendor)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)

    const txHash: string = yield call(() =>
      orderService.execute(chainId, nft, order, address!, fingerprint)
    )

    yield put(executeOrderSuccess(order, nft, chainId, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(executeOrderFailure(order, nft, error.message))
  }
}
function* handleExecuteAssetOrderRequest(action: ExecuteAssetOrderRequestAction) {
  const { asset, quantity } = action.payload
  try {

    const { orderService } = VendorFactory.build(Vendors.DECENTRALAND)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)
    const txHash: string = yield call(() =>
      orderService.executeAsset ? orderService.executeAsset(chainId, asset, quantity, address!) : "err"
    )

    yield put(executeAssetOrderSuccess(asset, quantity, chainId, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(executeAssetOrderFailure(asset, error.message))
  }
}

function* handleCancelOrderRequest(action: CancelOrderRequestAction) {
  const { order, nft } = action.payload
  try {
    if (order.nftId !== nft.id) {
      throw new Error('The order does not match the NFT')
    }
    const { orderService } = VendorFactory.build(nft.vendor)

    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const chainId: ChainId = yield select(getChainId)
    const txHash: string = yield call(() => orderService.cancel(chainId, nft, address!))
    yield put(cancelOrderSuccess(order, nft, chainId, txHash))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(cancelOrderFailure(order, nft, error.message))
  }
}
