import { log, BigInt } from '@graphprotocol/graph-ts'
import { NFT, Order, Bid } from '../../entities/schema'
import { ERC721, Transfer } from '../../entities/templates/ERC721/ERC721'
import { Asset, DetailedTransfer } from '../../entities/templates/ERC721/Asset'
import * as status from '../order/status'
import * as addresses from '../../data/addresses'
import { rarityText } from '../../data/nfts'

export function isMint(event: DetailedTransfer): boolean {
  return event.params.from.toHexString() == addresses.Null
}

export function getNFTId(
  category: string,
  contractAddress: string,
  tokenId: string
): string {
  return category + '-' + contractAddress + '-' + tokenId
}

export function getTokenURI(event: DetailedTransfer): string {
  let nft = Asset.bind(event.address)
  let tokenURICallResult = nft.try_tokenURI(event.params.tokenId)

  let tokenURI = ''

  if (tokenURICallResult.reverted) {
    log.warning('tokenURI reverted for tokenID: {} contract: {}', [
      event.params.tokenId.toString(),
      event.address.toHexString()
    ])
  } else {
    tokenURI = tokenURICallResult.value
  }

  return tokenURI
}

export function updateNFTOrderProperties(nft: NFT, order: Order): NFT {
  if (order.status == status.OPEN) {
    return addNFTOrderProperties(nft, order)
  } else if (order.status == status.SOLD || order.status == status.CANCELLED) {
    return clearNFTOrderProperties(nft)
  } else {
    return nft
  }
}

export function addNFTOrderProperties(nft: NFT, order: Order): NFT {
  nft.activeOrder = order.id
  nft.searchOrderStatus = order.status
  nft.searchOrderPrice = order.price
  nft.searchOrderCreatedAt = order.createdAt
  nft.searchOrderExpiresAt = order.expiresAt
  return nft
}

export function clearNFTOrderProperties(nft: NFT): NFT {
  nft.activeOrder = ''
  nft.searchOrderStatus = null
  nft.searchOrderPrice = null
  nft.searchOrderCreatedAt = null
  nft.searchOrderExpiresAt = null
  return nft
}

export function cancelActiveOrder(nft: NFT, now: BigInt): boolean {
  let oldOrder = Order.load(nft.activeOrder)
  if (oldOrder != null && oldOrder.status == status.OPEN) {
    // Here we are setting old orders as cancelled, because the smart contract allows new orders to be created
    // and they just overwrite them in place. But the subgraph stores all orders ever
    // you can also overwrite ones that are expired
    oldOrder.status = status.CANCELLED
    oldOrder.updatedAt = now
    oldOrder.save()

    return true
  }
  return false
}

export function getRarityText(rarity: i32): string {
  return rarityText[rarity].toString()

}
