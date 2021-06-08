import {
  FetchAssetsSuccessAction,
  FETCH_ASSETS_SUCCESS,
  FetchAssetsRequestAction,
  FETCH_ASSETS_REQUEST
} from '../../../asset/actions'
import { BROWSE, BrowseAction } from '../../../routing/actions'
import { SET_VIEW, SetViewAction } from '../../actions'
import { View } from '../../types'

export type BrowseUIState = {
  view?: View
  ids: string[]
  lastTimestamp: number
  count?: number
}

const INITIAL_STATE: BrowseUIState = {
  view: undefined,
  ids: [],
  count: undefined,
  lastTimestamp: 0
}

type UIReducerAction =
  | SetViewAction
  | FetchAssetsRequestAction
  | FetchAssetsSuccessAction
  | BrowseAction

export function browseReducer(
  state: BrowseUIState = INITIAL_STATE,
  action: UIReducerAction
) {
  switch (action.type) {
    case SET_VIEW: {
      return {
        ...state,
        view: action.payload.view
      }
    }
    case BROWSE: {
      const { view } = action.payload.searchOptions
      return {
        ...state,
        ids: view ? [] : [...state.ids]
      }
    }
    case FETCH_ASSETS_REQUEST: {

      return {
        ...state,
        ids: [],
        count: undefined
      }

    }
    case FETCH_ASSETS_SUCCESS: {
      if (action.payload.timestamp < state.lastTimestamp) {
        return state
      }

      return {
        ...state,
        ids: action.payload.assets.map(asset => asset.OptionID),
        count: action.payload.count,
        timestamp: action.payload.timestamp
      }




    }
    default:
      return state
  }
}
