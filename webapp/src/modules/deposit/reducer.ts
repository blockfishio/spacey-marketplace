import {
  LoadingState,
  loadingReducer
} from 'spacey-dapps/dist/modules/loading/reducer'
import {
  Order,
  // ChestOrder 
} from './types'
import {
  FetchNFTsRequestAction,
  FetchNFTsSuccessAction,
  FetchNFTsFailureAction,
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
  FetchNFTSuccessAction,
  FETCH_NFT_SUCCESS
} from '../nft/actions'

import {
  FetchAssetsRequestAction,
  FetchAssetsSuccessAction,
  FetchAssetsFailureAction,
  FETCH_ASSETS_REQUEST,
  // FETCH_ASSETS_SUCCESS,
  FETCH_ASSETS_FAILURE,
  FetchAssetSuccessAction,
  // FETCH_ASSET_SUCCESS
} from '../asset/actions'

export type OrderState = {
  data: Record<string, Order>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {},
  loading: [],
  error: null
}

type OrderReducerAction =
  | FetchNFTsRequestAction
  | FetchNFTsSuccessAction
  | FetchNFTsFailureAction
  | FetchNFTSuccessAction
  | FetchAssetsRequestAction
  | FetchAssetsSuccessAction
  | FetchAssetsFailureAction
  | FetchAssetSuccessAction

export function orderReducer(
  state: OrderState = INITIAL_STATE,
  action: OrderReducerAction
): OrderState {
  switch (action.type) {
    case FETCH_NFTS_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_NFTS_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.orders.reduce((obj, order) => {
            obj[order.id] = order
            return obj
          }, {} as Record<string, Order>)
        },
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case FETCH_NFTS_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case FETCH_NFT_SUCCESS: {
      const { order } = action.payload
      if (order) {
        return {
          ...state,
          data: {
            ...state.data,
            [order.id]: order
          }
        }
      }
      return state
    }
    case FETCH_ASSETS_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }

    case FETCH_ASSETS_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }



    default:
      return state
  }
}
