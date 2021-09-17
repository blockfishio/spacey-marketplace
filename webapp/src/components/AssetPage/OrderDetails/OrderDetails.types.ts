import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Asset } from '../../../modules/asset/types'

// import { Order } from '../../../modules/order/types'

export type Props = {
  asset: Asset

  // order: Order | null
}

export type MapStateProps = {}
export type MapDispatchProps = {}
export type MapDispatch = Dispatch<CallHistoryMethodAction>
export type OwnProps = Pick<Props, 'asset'>
