import { NFT } from '../../../modules/nft/types'
import { Asset } from '../../../modules/asset/types'

export type Props = {
  title: string
  nfts: NFT[]
  assets: Asset[]
  isSubHeader?: boolean
  isLoading: boolean
  onViewAll: () => void
}
