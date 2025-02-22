import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Asset } from '../../../modules/asset/types'

// import { Vendors } from '../../../modules/vendor/types'
// import {
//   WearableCategory,
//   WearableRarity
// } from '../../../modules/nft/wearable/types'

export type Props = {
  // nft: NFT<Vendors.DECENTRALAND>
  onNavigate: (path: string) => void
  asset: Asset


}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>

export type Content = {
  file: string
  hash: string
}

export type Representation = {
  bodyShapes: string[]
  mainFile: string
  overrideReplaces: string[]
  overrideHides: string[]
  contents: Content[]
}

// export type WearableData = {
//   id: string
//   representations: Representation[]
//   type: 'wearable'
//   category: WearableCategory
//   tags: string[]
//   baseUrl: string
//   i18n: { code: string; text: string }[]
//   thumbnail: string
//   image: string
//   replaces: string[]
//   hides: string[]
//   description: string
//   rarity: WearableRarity
// }
