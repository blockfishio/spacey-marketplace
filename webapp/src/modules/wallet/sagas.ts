import { takeEvery, all, put, select } from 'redux-saga/effects'
import { createWalletSaga } from 'decentraland-dapps/dist/modules/wallet/sagas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  CHANGE_ACCOUNT,
  CHANGE_NETWORK
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { ChainId } from '@dcl/schemas'
import { getChainId } from 'decentraland-dapps/dist/modules/wallet/selectors'


import { NFTCategory } from '../nft/types'
import { fetchAuthorizationRequest } from '../authorization/actions'
import { AuthorizationsRequest } from '../authorization/types'
import { wsConnectRequest } from '../websocket/actions'

import {
  // contractAddresses,
  contractAddressesAll,
  // contractCategories,
  contractCategoriesAll
} from '../contract/utils'

const baseWalletSaga = createWalletSaga({
  CHAIN_ID: +(process.env.REACT_APP_CHAIN_ID || 1),
  ALLOWED_IDS: process.env.REACT_APP_ALLOWED_CHAIN_IDS?.split(", ").map(id => parseInt(id))
})

export function* walletSaga() {
  yield all([baseWalletSaga(), fullWalletSaga()])
}

function* fullWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWallet)
  yield takeEvery(CHANGE_ACCOUNT, handleWallet)
  yield takeEvery(CHANGE_NETWORK, handleWallet)
}

function* handleWallet(
  action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction
) {
  const chainId: ChainId = yield select(getChainId)

  const { address, providerType } = action.payload.wallet

  // const { MANAToken, Marketplace,
  //   AssetSale } = contractAddresses

  const { MANAToken, Marketplace,
    AssetSale, DepositGMars, METAMARSToken } = contractAddressesAll[chainId]

  // TODO: VendorFactory.build().contractService.getAllowances()
  // TODO: VendorFactory.build().contractService.getApprovals()

  const authorization: AuthorizationsRequest = {
    allowances: {
      [Marketplace]: [MANAToken],
      // [MarketplaceAdapter]: [MANAToken],
      // [Bids]: [MANAToken],
      [AssetSale]: [MANAToken],
      [DepositGMars]: [METAMARSToken],
    },
    approvals: {
      [Marketplace]: Object.keys(contractCategoriesAll[chainId]).filter(
        key => contractCategoriesAll[chainId][key] !== NFTCategory.ART
      )
    }
  }

  yield put(fetchAuthorizationRequest(address, authorization))
  yield put(wsConnectRequest(address, providerType))
}
