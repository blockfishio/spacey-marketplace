import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { NFT, Boardingpass } from '../../entities/schema'
import { boardingpassHash } from '../../data/boardingpasses'

export function buildBoardingpassFromNFT(nft: NFT): Boardingpass {
  let boardingpass = new Boardingpass(nft.id)
  boardingpass.tokenId = nft.tokenId
  boardingpass.owner = nft.owner
  boardingpass.description = "Players who hold this will have advantages in the game."

  return boardingpass
}

export function getTokenIdFromLabelHash(labelHash: Bytes): BigInt {
  // .reverse() changes the array! we need to change it back
  labelHash.reverse()
  let tokenId = BigInt.fromUnsignedBytes(labelHash)
  labelHash.reverse()

  return tokenId
}


export function getBoardingpassName(boardingpass: Boardingpass): string {
  return "Boardingpass " + boardingpass.tokenId.toString()
}


export function getBoardingpassThumbnail(boardingpass: Boardingpass): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Boardingpass_thumbnail.png"
}

export function getBoardingpassImage(boardingpass: Boardingpass): string {
  const idx: i32 = boardingpass.tokenId.toI32()
  if (idx <= 100 && idx >= 0) {
    return "https://gateway.pinata.cloud/ipfs/" + boardingpassHash[idx].toString()
  }
  return ""

}
