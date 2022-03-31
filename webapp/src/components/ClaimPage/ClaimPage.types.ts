import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorizations } from '../../modules/authorization/types'
import {
  claimMetamarsRequest,
  ClaimMetamarsRequestAction
} from '../../modules/claim/actions'
import { Claimable } from '../../modules/claim/types'

export type Props = {
  authorizations: Authorizations
  isLoading: boolean
  claimable: Claimable | null
  onClaimMetamars: typeof claimMetamarsRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'authorizations' | 'isLoading' | 'claimable'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onClaimMetamars'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | ClaimMetamarsRequestAction
>
