import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { Asset } from '../../../modules/asset/types'
import { Authorizations } from '../../../modules/authorization/types'
import { executeAssetOrderRequest } from '../../../modules/order/actions'

export type Props = {
  asset: Asset
  authorizations: Authorizations
  isLoading: boolean
  onNavigate: (path: string) => void
  onExecuteOrder: typeof executeAssetOrderRequest
  wallet: Wallet
  // notEnoughMana?: boolean
}
