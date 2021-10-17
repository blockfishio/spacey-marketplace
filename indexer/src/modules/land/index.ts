import { BigInt } from '@graphprotocol/graph-ts'
import { NFT, Land } from '../../entities/schema'
import { tileMap } from '../../data/tilemap'
import { landImage } from '../../data/lands'

export function buildLandFromNFT(nft: NFT): Land {
  let land = new Land(nft.id)

  land.tokenId = nft.tokenId
  land.owner = nft.owner
  land.x = getXFromId(nft.tokenId) as i32
  land.y = getYFromId(nft.tokenId) as i32
  land.description = "Allows players to place their buildings on it."
  return land
}


export function getLandImage(land: Land): string {
  const tokenId = land.tokenId
  const index: i32 = tokenId.toI32() - 101;
  if (index < 72) {
    return landImage[0]
  }
  else if (index < 144) {
    return landImage[1]
  }
  else if (index < 216) {
    return landImage[2]
  }
  else {
    return landImage[3]
  }

}

function getXFromId(id: BigInt): number {
  const index: i32 = id.toI32() - 101
  const t = tileMap[index]
  const x = parseInt(t.split(',')[0])

  return x
}

function getYFromId(id: BigInt): number {
  const index: i32 = id.toI32() - 101
  const t = tileMap[index]
  const y = parseInt(t.split(',')[1])
  return y
}

export function getLandName(land: Land): string {
  const alphabet = "ABCDEFGHGIJKLMNOPQRSTUVWXYZ"
  let name = ''
  const x: i32 = (land.tokenId.toI32() - 101) / 36
  const y: i32 = (land.tokenId.toI32() - 101) % 36

  name = 'LAND ' + alphabet.charAt(x) + y.toString()

  return name
}

export function getLandSearchText(land: Land): string {
  let res = ''
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const x: i32 = (land.tokenId.toI32() - 101) / 36
  const y: i32 = (land.tokenId.toI32() - 101) % 36

  res = alphabet.charAt(x) + y.toString()


  return res

}