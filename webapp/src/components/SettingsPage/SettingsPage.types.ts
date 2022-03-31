import { Dispatch } from 'redux'
import { Wallet } from 'spacey-dapps/dist/modules/wallet/types'
import { Transaction } from 'spacey-dapps/dist/modules/transaction/types'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorizations } from '../../modules/authorization/types'
import {
  AllowTokenRequestAction,
  ApproveTokenRequestAction,
  allowTokenRequest,
  approveTokenRequest
} from '../../modules/authorization/actions'
import { Claimable } from '../../modules/claim/types'

export type Props = {
  wallet: Wallet | null
  claimable: Claimable | null
  authorizations: Authorizations | undefined
  pendingAllowTransactions: Transaction[]
  pendingApproveTransactions: Transaction[]
  isLoadingAuthorization: boolean
  isConnecting: boolean
  onAllowToken: typeof allowTokenRequest
  onApproveToken: typeof approveTokenRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  | 'wallet'
  | 'claimable'
  | 'authorizations'
  | 'pendingAllowTransactions'
  | 'pendingApproveTransactions'
  | 'isLoadingAuthorization'
  | 'isConnecting'
>
export type MapDispatchProps = Pick<
  Props,
  'onAllowToken' | 'onApproveToken' | 'onNavigate'
>
export type MapDispatch = Dispatch<
  AllowTokenRequestAction | ApproveTokenRequestAction | CallHistoryMethodAction
>
