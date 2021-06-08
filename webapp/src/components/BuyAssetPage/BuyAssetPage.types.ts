import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorizations } from '../../modules/authorization/types'
import {
  executeAssetOrderRequest,
  ExecuteAssetOrderRequestAction
} from '../../modules/order/actions'

export type Props = {
  authorizations: Authorizations
  isLoading: boolean
  onExecuteOrder: typeof executeAssetOrderRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onExecuteOrder'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | ExecuteAssetOrderRequestAction
>
