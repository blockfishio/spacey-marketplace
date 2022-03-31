import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { walletReducer as wallet } from 'spacey-dapps/dist/modules/wallet/reducer'
import { translationReducer as translation } from 'spacey-dapps/dist/modules/translation/reducer'
import { storageReducer as storage } from 'spacey-dapps/dist/modules/storage/reducer'
import { transactionReducer as transaction } from 'spacey-dapps/dist/modules/transaction/reducer'
import { profileReducer as profile } from 'spacey-dapps/dist/modules/profile/reducer'

import { accountReducer as account } from './account/reducer'
import { authorizationReducer as authorization } from './authorization/reducer'
import { bidReducer as bid } from './bid/reducer'
import { nftReducer as nft } from './nft/reducer'
import { assetReducer as asset } from './asset/reducer'
import { ownerassetReducer as ownerasset } from './ownerasset/reducer'
import { orderReducer as order } from './order/reducer'
import { proximityReducer as proximity } from './proximity/reducer'
import { routingReducer as routing } from './routing/reducer'
import { tileReducer as tile } from './tile/reducer'
import { uiReducer as ui } from './ui/reducer'
import { claimableReducer as claimable } from './claim/reducer'
import { metamarsReducer as metamars } from './deposit/reducer'


export const createRootReducer = (history: History) =>
  combineReducers({
    account,
    authorization,
    bid,
    nft,
    asset,
    ownerasset,
    order,
    profile,
    proximity,
    routing,
    tile,
    ui,
    router: connectRouter(history),
    storage,
    transaction,
    translation,
    wallet,
    claimable,
    metamars
  })

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
