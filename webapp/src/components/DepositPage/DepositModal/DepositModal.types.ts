import { Wallet } from 'spacey-dapps/dist/modules/wallet/types'
import { Authorizations } from '../../../modules/authorization/types'
import { depositGMarsRequest } from '../../../modules/deposit/actions'
import { Metamars } from '../../../modules/deposit/types'

export type Props = {
  isLoading: boolean
  authorizations: Authorizations

  onNavigate: (path: string) => void
  onDepositGMars: typeof depositGMarsRequest
  metamars: Metamars | null
  wallet: Wallet
  // notEnoughMana?: boolean
}
