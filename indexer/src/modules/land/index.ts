import { BigInt } from '@graphprotocol/graph-ts'
import { NFT, Land } from '../../entities/schema'

export function buildLandFromNFT(nft: NFT): Land {
  let land = new Land(nft.id)

  land.tokenId = nft.tokenId
  land.owner = nft.owner
  land.x = getXFromId(nft.tokenId) as i32
  land.y = getYFromId(nft.tokenId) as i32
  return land
}


export function getLandImage(): string {
  return (
    'https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Land.png'
  )
}

function getXFromId(id: BigInt): number {
  const x = ((id.toI32() - 101) / 36)
  return x
}

function getYFromId(id: BigInt): number {
  const y = ((id.toI32() - 101) % 36)
  return y
}

export function getLandName(land: Land): string {
  const alphabet = "ABCDEFGHGIJKLMNOPQRSTUVWXYZ"
  let name = ''
  name = 'LAND ' + alphabet.charAt(land.x as i32) + (land.y as i32).toString()

  return name
}