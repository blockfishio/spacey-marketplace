import { Blindbox } from '../entities/schema'
import {
  AssetPurchased
} from '../entities/Blindbox/Blindbox'
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'
import { buildCountFromBlindbox } from '../modules/count'
import { BigInt } from '@graphprotocol/graph-ts'

export function handleAssetPurchased(event: AssetPurchased): void {
  let recipient = event.params.recipient
  let optionId = event.params.optionID
  let quantity = event.params.quantity.toI32()


  for (let index = 0; index < quantity; index++) {
    let count = buildCountFromBlindbox()
    let blindboxTotal: i32 = count.blindboxTotal
    let blindbox = new Blindbox(event.transaction.hash.toHexString())
    blindbox.blockNumber = event.block.number
    blindbox.txHash = event.transaction.hash
    blindbox.createdAt = event.block.timestamp
    blindbox.owner = recipient.toHex()
    blindbox.optionId = optionId
    blindbox.save()
    count.save()

  }
}

