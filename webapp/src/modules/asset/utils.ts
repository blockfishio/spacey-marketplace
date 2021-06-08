import { t } from 'decentraland-dapps/dist/modules/translation/utils'
// import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
// import { Vendors } from '../vendor/types'
import { NFTCategory } from '../nft/types'
import { AssetCategory } from '../asset/types'
// import { SortDirection, SortBy } from '../routing/types'
import { contractCategories } from '../contract/utils'
// import { addressEquals } from '../wallet/utils'
import { Asset } from './types'

export function getNFTId(contractAddress: string, tokenId: string) {
  // TODO: added "wearable" as fallback so when a new collection is added to TheGraph that hasn't been added to the frontend yet, we can handle it without blowing up
  const contractCategory =
    contractCategories[contractAddress] || NFTCategory.WEARABLE

  if (!contractCategory) {
    throw new Error(
      `Could not find a valid category for contract ${contractAddress}`
    )
  }

  return contractCategory + '-' + contractAddress + '-' + tokenId
}

export function getAssetName(
  asset: Pick<Asset, 'Category'>
) {


  switch (asset.Category) {
    case AssetCategory.CHEST:
      return t('global.Chest')


    default:
      return t('global.nft')
  }
}

export function getAsset(
  optionId: string | null,
  assets: Record<string, Asset>
): Asset | null {
  if (!optionId) {
    return null
  }

  return optionId in assets ? assets[optionId] : null
}


