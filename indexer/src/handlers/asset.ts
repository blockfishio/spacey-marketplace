import { Address } from '@graphprotocol/graph-ts'
import { AssetInitialized } from '../entities/Asset/Asset'
import { ERC721 } from '../entities/templates'
import { buildCount } from '../modules/count'
import {
  Asset

} from '../data/addresses'
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'

export function handleAssetInitialized(_: AssetInitialized): void {
  let count = buildCount()

  if (count.started == 0) {
    ERC721.create(Address.fromString(Asset))

    count.started = 1
    count.save()
  }
}

