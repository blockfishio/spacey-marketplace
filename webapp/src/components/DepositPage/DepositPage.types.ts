import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorizations } from '../../modules/authorization/types'
import {
  depositGMarsRequest,
  DepositGMarsRequestAction
} from '../../modules/deposit/actions'
import { Metamars } from '../../modules/deposit/types'

export type Props = {
  authorizations: Authorizations
  isLoading: boolean
  metamars: Metamars | null
  onDepositGMars: typeof depositGMarsRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isLoading' | 'metamars'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onDepositGMars'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | DepositGMarsRequestAction
>
