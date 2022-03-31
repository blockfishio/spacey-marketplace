import { Dispatch } from 'redux'
import { Transaction } from 'spacey-dapps/dist/modules/transaction/types'
import { Authorizations } from '../../modules/authorization/types'
import {
  allowTokenRequest,
  approveTokenRequest,
  AllowTokenRequestAction,
  ApproveTokenRequestAction
} from '../../modules/authorization/actions'
import { Wallet } from 'spacey-dapps/dist/modules/wallet/types'

export enum AuthorizationType {
  ALLOWANCE = 'allowance',
  APPROVAL = 'approval'
}

export type Props = {
  wallet: Wallet | null,
  open: boolean
  contractAddress: string
  tokenAddress: string
  type: AuthorizationType
  authorizations: Authorizations
  pendingTransactions: Transaction[]
  onAllow: typeof allowTokenRequest
  onApprove: typeof approveTokenRequest
  onCancel: () => void
  onProceed: () => void
}

export type MapStateProps = Pick<
  Props,
  'authorizations' | 'pendingTransactions'
>
export type MapDispatchProps = Pick<Props, 'onAllow' | 'onApprove'>
export type MapDispatch = Dispatch<
  AllowTokenRequestAction | ApproveTokenRequestAction
>
export type OwnProps = Pick<
  Props,
  'open' | 'contractAddress' | 'tokenAddress' | 'type' | 'onProceed'
>
