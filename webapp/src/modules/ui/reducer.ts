import { combineReducers } from 'redux'
import { nftReducer as nft, NFTUIState } from './nft/reducer'
import { assetReducer as asset, AssetUIState } from './asset/reducer'

export type UIState = {
  nft: NFTUIState,
  asset: AssetUIState
}

export const uiReducer = combineReducers({
  nft,
  asset
})
