import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { Authorizations } from '../../../modules/authorization/types'
import { depositGMarsRequest } from '../../../modules/deposit/actions'

export type Props = {
  isLoading: boolean
  authorizations: Authorizations

  onNavigate: (path: string) => void
  onDepositGMars: typeof depositGMarsRequest
  wallet: Wallet
  // notEnoughMana?: boolean
}
