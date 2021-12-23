import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { claimMetamarsRequest } from '../../../modules/claim/actions'

export type Props = {
  isLoading: boolean
  onNavigate: (path: string) => void
  onClaimMetamars: typeof claimMetamarsRequest
  wallet: Wallet
  // notEnoughMana?: boolean
}
