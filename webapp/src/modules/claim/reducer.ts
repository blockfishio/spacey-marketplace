import {
  LoadingState,
  loadingReducer
} from 'spacey-dapps/dist/modules/loading/reducer'
import {
  Claimable,
} from './types'
import {
  FetchClaimableSuccessAction,
  FetchClaimableFailureAction,
  FETCH_CLAIMABLE_SUCCESS,
  FETCH_CLAIMABLE_FAILURE
} from './actions'



export type ClaimableState = {
  data: Claimable | null
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: null,
  loading: [],
  error: null
}

type ClaimableReducerAction =
  | FetchClaimableSuccessAction
  | FetchClaimableFailureAction


export function claimableReducer(
  state: ClaimableState = INITIAL_STATE,
  action: ClaimableReducerAction
): ClaimableState {
  switch (action.type) {
    case FETCH_CLAIMABLE_SUCCESS: {
      const {
        claimable
      } = action.payload
      return {
        ...state,
        data: claimable,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case FETCH_CLAIMABLE_FAILURE: {
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
