import { Asset } from '../../modules/asset/types'

export type Props = {
  isConnecting: boolean
  children: (asset: Asset) => React.ReactNode | null
}

export type MapStateProps = Pick<Props, 'isConnecting'>
export type MapDispatchProps = {}
export type MapDispatch = {}
