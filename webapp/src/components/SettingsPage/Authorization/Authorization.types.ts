import { Transaction } from 'spacey-dapps/dist/modules/transaction/types'
import { Wallet } from 'spacey-dapps/dist/modules/wallet/types'
import {
  allowTokenRequest,
  approveTokenRequest
} from '../../../modules/authorization/actions'

export type Props = {
  wallet: Wallet | null,
  checked: boolean
  contractAddress: string
  tokenContractAddress: string
  pendingTransactions: Transaction[]
  onChange: typeof allowTokenRequest | typeof approveTokenRequest
}
