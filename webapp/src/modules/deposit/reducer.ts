import {
  LoadingState,
  loadingReducer
} from 'spacey-dapps/dist/modules/loading/reducer'
import {
  Metamars
} from './types'
import {
  MetamarsBalanceSuccessAction,
  MetamarsBalanceFailureAction,
  METAMARS_BALANCE_SUCCESS,
  METAMARS_BALANCE_FAILURE
} from './actions'



export type MetamarsState = {
  data: Metamars | null
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE = {
  data: null,
  loading: [],
  error: null
}

type MetamarsReducerAction =
  | MetamarsBalanceSuccessAction
  | MetamarsBalanceFailureAction

export function metamarsReducer(
  state: MetamarsState = INITIAL_STATE,
  action: MetamarsReducerAction
): MetamarsState {
  switch (action.type) {
    case METAMARS_BALANCE_SUCCESS: {
      const {
        metamars
      } = action.payload
      return {
        ...state,
        data: metamars,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case METAMARS_BALANCE_FAILURE: {
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
