import { combineReducers } from 'redux'
import { bidReducer as bid, BidUIState } from './bid/reducer'
import { browseReducer as browse, BrowseUIState } from './browse/reducer'
import {
  homepageReducer as homepage,
  HomepageUIState
} from './homepage/reducer'

export type OwnerAssetUIState = {
  bid: BidUIState
  browse: BrowseUIState
  homepage: HomepageUIState
}

export const ownerassetReducer = combineReducers({
  bid,
  browse,
  homepage,
})
