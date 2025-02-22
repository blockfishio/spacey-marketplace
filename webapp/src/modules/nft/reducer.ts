import {
  LoadingState,
  loadingReducer
} from 'decentraland-dapps/dist/modules/loading/reducer'

import { NFT } from './types'
import {
  FetchNFTRequestAction,
  FetchNFTSuccessAction,
  FetchNFTFailureAction,
  FETCH_NFT_REQUEST,
  FETCH_NFT_SUCCESS,
  FETCH_NFT_FAILURE,
  FetchNFTsRequestAction,
  FetchNFTsSuccessAction,
  FetchNFTsFailureAction,
  FETCH_NFTS_REQUEST,
  FETCH_NFTS_SUCCESS,
  FETCH_NFTS_FAILURE,
  FetchTowerDetailRequestAction,
  FetchTowerDetailFailureAction,
  FetchTowerDetailSuccessAction,
  FETCH_TOWERDETAIL_REQUEST,
  FETCH_TOWERDETAIL_SUCCESS,
  FETCH_TOWERDETAIL_FAILURE
} from './actions'

export type NFTState = {
  data: Record<string, NFT>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: {},
  loading: [],
  error: null
}

type NFTReducerAction =
  | FetchNFTRequestAction
  | FetchNFTSuccessAction
  | FetchNFTFailureAction
  | FetchNFTsRequestAction
  | FetchNFTsSuccessAction
  | FetchNFTsFailureAction
  | FetchTowerDetailRequestAction
  | FetchTowerDetailSuccessAction
  | FetchTowerDetailFailureAction

export function nftReducer(
  state: NFTState = INITIAL_STATE,
  action: NFTReducerAction
) {
  switch (action.type) {
    case FETCH_NFTS_REQUEST:
    case FETCH_TOWERDETAIL_REQUEST:
    case FETCH_NFT_REQUEST:
      {
        return {
          ...state,
          loading: loadingReducer(state.loading, action)
        }
      }
    case FETCH_NFTS_FAILURE:
    case FETCH_TOWERDETAIL_FAILURE:
    case FETCH_NFT_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case FETCH_NFT_SUCCESS: {
      const { nft } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [nft.id]: nft
        },
        error: null
      }
    }
    case FETCH_NFTS_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          ...action.payload.nfts.reduce((obj, nft) => {
            obj[nft.id] = nft
            return obj
          }, {} as Record<string, NFT>)
        }
      }
    }
    case FETCH_TOWERDETAIL_SUCCESS: {
      const { nft, towerdetail } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [nft.id]: {
            ...state.data[nft.id],
            detail: towerdetail
          }
        }
      }
    }
    default:
      return state
  }
}
