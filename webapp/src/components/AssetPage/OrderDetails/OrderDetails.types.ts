import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Asset } from '../../../modules/asset/types'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'

// import { Order } from '../../../modules/order/types'

export type Props = {
  asset: Asset
  wallet: Wallet

  // order: Order | null
}

export type MapStateProps = {}
export type MapDispatchProps = {}
export type MapDispatch = Dispatch<CallHistoryMethodAction>
export type OwnProps = Pick<Props, 'asset'>
