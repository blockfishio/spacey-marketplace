
import { Asset } from '../../asset/types'
import { AssetFragment } from './asset/fragments'

import { AssetService as AssetServiceInterface } from '../services'
// import { Vendors } from '../types'
import { assetAPI } from './asset/api'



export class AssetService implements AssetServiceInterface {
  async fetch() {
    const remoteAssets = await assetAPI.fetch()
    const assets: Asset[] = []
    for (const remoteAsset of remoteAssets) {
      const nft = this.toAsset(remoteAsset)


      assets.push(nft)
    }
    return [assets] as const
  }


  async fetchOne(optionId: string) {
    const remoteAsset = await assetAPI.fetchOne(optionId)

    const asset = this.toAsset(remoteAsset)





    return [asset] as const
  }

  toAsset(asset: AssetFragment): Asset {
    return {
      Category: asset.Category,
      ImageURL: asset.ImageURL,
      Price: asset.Price,
      PriceUnit: asset.PriceUnit,
      OptionID: asset.OptionID

    }
  }

}
