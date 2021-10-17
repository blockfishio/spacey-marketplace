import { combineReducers } from 'redux'
import { nftReducer as nft, NFTUIState } from './nft/reducer'
import { assetReducer as asset, AssetUIState } from './asset/reducer'
import { ownerassetReducer as ownerasset, OwnerAssetUIState } from './ownerasset/reducer'

export type UIState = {
  nft: NFTUIState,
  asset: AssetUIState,
  ownerasset: OwnerAssetUIState
}

export const uiReducer = combineReducers({
  nft,
  asset,
  ownerasset
})
