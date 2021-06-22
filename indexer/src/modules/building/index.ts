import { NFT, Building } from '../../entities/schema'

export function buildBuildingFromNFT(nft: NFT): Building {
  let building = new Building(nft.id)

  building.tokenId = nft.tokenId
  building.owner = nft.owner
  building.subCategory = nft.subcategory

  return building
}

export function getBuildingImage(building: Building): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Building" + building.subCategory + "_0.png"
}

