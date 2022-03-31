// import { Wallet } from 'spacey-dapps/dist/modules//wallet/types'
// import { NFT } from '../../../modules/nft/types'
import { Asset } from '../../../modules/asset/types'
// import { Order } from '../../../modules/order/types'
// import { Bid } from '../../../modules/bid/types'

export type Props = {
  // wallet: Wallet | null
  asset: Asset
  // order: Order | null
  // bids: Bid[]
}

export type MapStateProps = {}
export type MapDispatchProps = {}
export type MapDispatch = {}
export type OwnProps = Pick<Props, 'asset'>
