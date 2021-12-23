import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorizations } from '../../modules/authorization/types'
import {
  claimMetamarsRequest,
  ClaimMetamarsRequestAction
} from '../../modules/claim/actions'

export type Props = {
  authorizations: Authorizations
  isLoading: boolean
  onClaimMetamars: typeof claimMetamarsRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onClaimMetamars'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | ClaimMetamarsRequestAction
>
