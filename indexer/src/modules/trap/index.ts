import { NFT, Trap } from '../../entities/schema'
import { trapName, trapDescription } from '../../data/traps'

export function buildTrapFromNFT(nft: NFT): Trap {
  let trap = new Trap(nft.id)

  trap.tokenId = nft.tokenId
  trap.owner = nft.owner
  trap.subCategory = nft.subcategory
  const idx: i32 = trap.subCategory.toI32()
  trap.description = trapDescription[idx].toString()


  return trap
}


export function getTrapImage(trap: Trap): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Trap" + trap.subCategory.toString() + "_0.png"
}
export function getTrapThumbnail(trap: Trap): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Trap_" + trap.subCategory.toString() + ".png"
}
export function getTrapName(trap: Trap): string {
  const idx: i32 = trap.subCategory.toI32()
  return trapName[idx].toString()
}