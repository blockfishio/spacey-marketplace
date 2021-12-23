import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorizations } from '../../modules/authorization/types'
import {
  depositGMarsRequest,
  DepositGMarsRequestAction
} from '../../modules/deposit/actions'

export type Props = {
  authorizations: Authorizations
  isLoading: boolean
  onDepositGMars: typeof depositGMarsRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onDepositGMars'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | DepositGMarsRequestAction
>
