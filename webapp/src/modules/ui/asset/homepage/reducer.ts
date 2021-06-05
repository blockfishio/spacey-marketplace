
import {
  FetchAssetsSuccessAction,
  FETCH_ASSETS_SUCCESS
} from '../../../asset/actions'
import { View } from '../../types'

export type HomepageUIState = {
  // [View.HOME_WEARABLES]: string[]
  // [View.HOME_LAND]: string[]
  // [View.HOME_ENS]: string[],
  // [View.HOME_BOARDINGPASS]: string[],
  [View.COMMUNITY]: string[],
  [View.OFFICAL]: string[]
}

const INITIAL_STATE: HomepageUIState = {
  // [View.HOME_WEARABLES]: [],
  // [View.HOME_LAND]: [],
  // [View.HOME_ENS]: [],
  // [View.HOME_BOARDINGPASS]: [],
  [View.OFFICAL]: [],
  [View.COMMUNITY]: []
}

type UIReducerAction = FetchAssetsSuccessAction

export function homepageReducer(
  state: HomepageUIState = INITIAL_STATE,
  action: UIReducerAction
) {
  switch (action.type) {
    case FETCH_ASSETS_SUCCESS: {
      console.log("success")
      const assetIds = action.payload.assets.map(asset => asset.OptionID)
      console.log(assetIds, state)
      return {
        ...state,
        [View.OFFICAL]: assetIds
      }
    }


    default:
      return state
  }
}
