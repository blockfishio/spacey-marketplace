import { Asset } from '../../modules/asset/types'
export type Props = {
  asset: Asset
}

export type MapStateProps = {}
export type MapDispatchProps = {}
export type OwnProps = Pick<Props, 'asset'>
