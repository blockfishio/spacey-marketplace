import { NFT, Trap } from '../../entities/schema'

export function buildTrapFromNFT(nft: NFT): Trap {
  let trap = new Trap(nft.id)

  trap.tokenId = nft.tokenId
  trap.owner = nft.owner
  trap.subCategory = nft.subcategory


  return trap
}


export function getTrapImage(trap: Trap): string {
  return "https://spacey2025.s3.us-east-2.amazonaws.com/Assets/Trap" + trap.subCategory + "_0.png"
}