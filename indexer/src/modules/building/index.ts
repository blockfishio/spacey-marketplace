import { NFT, Building } from '../../entities/schema'
import { buildingName, buildingDescription } from '../../data/buildngs'


export function buildBuildingFromNFT(nft: NFT): Building {
  let building = new Building(nft.id)

  building.tokenId = nft.tokenId
  building.owner = nft.owner
  building.subCategory = nft.subcategory
  const idx: i32 = building.subCategory.toI32()
  building.description = buildingDescription[idx].toString()
  return building
}

export function getBuildingImage(building: Building): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Building" + building.subCategory.toString() + "_0.png"
}

export function getBuildingName(building: Building): string {
  const idx: i32 = building.subCategory.toI32()
  return buildingName[idx].toString()
}

