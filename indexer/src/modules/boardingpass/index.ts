import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { NFT, Boardingpass } from '../../entities/schema'
import { boardingpassHash } from '../../data/boardingpasses'

export function buildBoardingpassFromNFT(nft: NFT): Boardingpass {
  let boardingpass = new Boardingpass(nft.id)
  boardingpass.tokenId = nft.tokenId
  boardingpass.owner = nft.owner

  return boardingpass
}

export function getTokenIdFromLabelHash(labelHash: Bytes): BigInt {
  // .reverse() changes the array! we need to change it back
  labelHash.reverse()
  let tokenId = BigInt.fromUnsignedBytes(labelHash)
  labelHash.reverse()

  return tokenId
}

export function getBoardingpassImage(boardingpass: Boardingpass): string {
  const idx: i32 = boardingpass.tokenId.toI32()
  if (idx <= 100 && idx >= 0) {
    return "https://gateway.pinata.cloud/ipfs/" + boardingpassHash[idx].toString()
  }
  return ""

}
