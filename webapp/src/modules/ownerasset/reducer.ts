import {
  LoadingState,
  loadingReducer
} from 'decentraland-dapps/dist/modules/loading/reducer'

import { OwnerAsset, OwnerChest } from './types'
import {
  FetchOwnerAssetsRequestAction,
  FetchOwnerAssetsSuccessAction,
  FetchOwnerAssetsFailureAction,
  FETCH_OWNERASSETS_REQUEST,
  FETCH_OWNERASSETS_SUCCESS,
  FETCH_OWNERASSETS_FAILURE,
} from './actions'

export type OwnerAssetState = {
  data: Record<string, OwnerAsset | OwnerChest>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  data: {},
  error: null
}

type OwnerAssetReducerAction =
  | FetchOwnerAssetsRequestAction
  | FetchOwnerAssetsSuccessAction
  | FetchOwnerAssetsFailureAction

export function ownerassetReducer(
  state: OwnerAssetState = INITIAL_STATE,
  action: OwnerAssetReducerAction
) {
  switch (action.type) {
    case FETCH_OWNERASSETS_REQUEST:
      {
        return {
          ...state,
          loading: loadingReducer(state.loading, action)
        }
      }
    case FETCH_OWNERASSETS_FAILURE:
      {
        return {
          ...state,
          loading: loadingReducer(state.loading, action),
          error: action.payload.error
        }
      }

    case FETCH_OWNERASSETS_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          ...action.payload.chests.reduce((obj, chest) => {
            obj[chest.AssetID] = chest
            return obj
          },
            {} as Record<string, OwnerAsset | OwnerChest>),
          ...action.payload.assets.reduce((obj, asset) => {
            obj[asset.AssetID] = asset
            return obj
          },
            {} as Record<string, OwnerAsset | OwnerChest>)
        }
      }
    }
    default:
      return state
  }
}
