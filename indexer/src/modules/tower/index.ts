import { NFT, Tower } from '../../entities/schema'

export function buildTowerFromNFT(nft: NFT): Tower {
  let tower = new Tower(nft.id)

  tower.tokenId = nft.tokenId
  tower.owner = nft.owner
  tower.subCategory = nft.subcategory


  return tower
}

export function getTowerImage(tower: Tower): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Tower" + tower.subCategory + "_0.png"
}
