import {
  FetchNFTsSuccessAction,
  FETCH_NFTS_SUCCESS
} from '../../../nft/actions'
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

type UIReducerAction = FetchNFTsSuccessAction

export function homepageReducer(
  state: HomepageUIState = INITIAL_STATE,
  action: UIReducerAction
) {
  switch (action.type) {


    case FETCH_NFTS_SUCCESS: {

      const nftIds = action.payload.nfts.map(nft => nft.id)

      switch (action.payload.options.view) {
        // case View.HOME_WEARABLES: {
        //   return {
        //     ...state,
        //     [View.HOME_WEARABLES]: nftIds
        //   }
        // }
        case View.HOME_LAND: {
          return {
            ...state,
            [View.HOME_LAND]: nftIds
          }
        }

        case View.HOME_BOARDINGPASS: {
          return {
            ...state,
            [View.HOME_BOARDINGPASS]: nftIds
          }
        }

        case View.COMMUNITY: {
          return {
            ...state,
            [View.COMMUNITY]: nftIds
          }
        }

        case View.OFFICAL: {
          return {
            ...state,
            [View.OFFICAL]: nftIds
          }
        }

        default:
          return state
      }
    }
    default:
      return state
  }
}
