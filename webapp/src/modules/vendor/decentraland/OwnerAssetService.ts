
// import { OwnerAsset, OwnerChest } from '../../asset/types'

import { OwnerAssetService as OwnerAssetServiceInterface } from '../services'
// import { Vendors } from '../types'
import { ownerassetAPI } from './ownerasset/api'
import { OwnerAssetsFetchOptions } from '../../ownerasset/types'



export class OwnerAssetService implements OwnerAssetServiceInterface {
  async fetch(params: OwnerAssetsFetchOptions) {
    const ownerAssets = await ownerassetAPI.fetch(params)
    // const chests: OwnerChest[] = []
    // const assets: OwnerAsset[] = []
    const { Chests, Assets } = ownerAssets

    return [Chests, Assets ? Assets : []] as const
  }




}
