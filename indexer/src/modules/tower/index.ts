import { NFT, Tower } from '../../entities/schema'
import { towerName, towerDescription } from '../../data/towers'

export function buildTowerFromNFT(nft: NFT): Tower {
  let tower = new Tower(nft.id)

  tower.tokenId = nft.tokenId
  tower.owner = nft.owner
  tower.subCategory = nft.subcategory
  const idx: i32 = tower.subCategory.toI32()
  tower.description = towerDescription[idx].toString()

  return tower
}

export function getTowerImage(tower: Tower): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Tower" + tower.subCategory.toString() + "_0.png"
}

export function getTowerThumbnail(tower: Tower): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Tower" + tower.subCategory.toString() + "_0.png"
}

export function getTowerName(tower: Tower): string {
  const idx: i32 = tower.subCategory.toI32()
  return towerName[idx].toString()
}