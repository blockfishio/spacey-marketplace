import { claimMetamarsRequest } from '../../../modules/claim/actions'
import { Claimable } from '../../../modules/claim/types'

export type Props = {
  isLoading: boolean
  onNavigate: (path: string) => void
  onClaimMetamars: typeof claimMetamarsRequest
  claimable: Claimable | null
  // notEnoughMana?: boolean
}
