import {
  LoadingState,
  loadingReducer
} from 'spacey-dapps/dist/modules/loading/reducer'

import { Asset } from './types'
import {

  FetchAssetsRequestAction,
  FetchAssetsSuccessAction,
  FetchAssetsFailureAction,
  FETCH_ASSETS_REQUEST,
  FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAILURE,
  FetchAssetRequestAction,
  FetchAssetSuccessAction,
  FetchAssetFailureAction,
  FETCH_ASSET_REQUEST,
  FETCH_ASSET_SUCCESS,
  FETCH_ASSET_FAILURE,
  CountAssetRequestAction,
  CountAssetSuccessAction,
  CountAssetFailureAction,
  COUNT_ASSET_REQUEST,
  COUNT_ASSET_SUCCESS,
  COUNT_ASSET_FAILURE,


} from './actions'

export type AssetState = {
  data: Record<string, Asset>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  loading: [],
  data: {},
  error: null
}

type AssetReducerAction =
  | FetchAssetRequestAction
  | FetchAssetSuccessAction
  | FetchAssetFailureAction
  | FetchAssetsRequestAction
  | FetchAssetsSuccessAction
  | FetchAssetsFailureAction
  | CountAssetRequestAction
  | CountAssetSuccessAction
  | CountAssetFailureAction


export function assetReducer(
  state: AssetState = INITIAL_STATE,
  action: AssetReducerAction
): AssetState {
  switch (action.type) {
    case FETCH_ASSETS_REQUEST:
    case FETCH_ASSET_REQUEST:
    case COUNT_ASSET_REQUEST:
      {
        return {
          ...state,
          loading: loadingReducer(state.loading, action)
        }
      }
    case FETCH_ASSETS_FAILURE:
    case FETCH_ASSET_FAILURE:
    case COUNT_ASSET_FAILURE:
      {
        return {
          ...state,
          loading: loadingReducer(state.loading, action),
          error: action.payload.error
        }
      }
    case FETCH_ASSET_SUCCESS: {
      const { asset } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [asset.OptionID]: asset
        },
        error: null
      }
    }
    case FETCH_ASSETS_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          ...action.payload.assets.reduce((obj, asset) => {
            obj[asset.OptionID] = asset
            return obj
          }, {} as Record<string, Asset>)
        }
      }
    }
    case COUNT_ASSET_SUCCESS: {
      const { assetcount } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [assetcount.OptionID]: {

            ...state.data[assetcount.OptionID],
            Count: assetcount.Count
          }
        },
        error: null
      }
    }



    default:
      return state
  }
}
