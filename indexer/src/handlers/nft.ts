import { log } from '@graphprotocol/graph-ts'
import { Transfer } from '../entities/templates/ERC721/ERC721'
import { DetailedTransfer } from '../entities/templates/ERC721/Asset'
import {
  NFT,
  Order,
  Boardingpass,
  Land,
  Building,
  Tower,
  Trap
} from '../entities/schema'
import {
  isMint,
  getNFTId,
  getTokenURI,
  cancelActiveOrder,
  clearNFTOrderProperties
} from '../modules/nft'
import { getCategory, getCategoryByIndex, getSubCategoryByIndex } from '../modules/category'
// import { buildEstateFromNFT, getEstateImage } from '../modules/estate'

import { buildCountFromNFT } from '../modules/count'
import { BigInt } from '@graphprotocol/graph-ts'


import { buildBoardingpassFromNFT, getBoardingpassImage, getBoardingpassThumbnail, getBoardingpassName } from '../modules/boardingpass'
import { buildLandFromNFT, getLandImage, getLandSearchText, getLandName } from '../modules/land'
import { buildBuildingFromNFT, getBuildingImage, getBuildingName } from '../modules/building'
import { buildTowerFromNFT, getTowerImage, getTowerName, getTowerThumbnail } from '../modules/tower'
import { buildTrapFromNFT, getTrapImage, getTrapName, getTrapThumbnail } from '../modules/trap'

import { createAccount } from '../modules/wallet'
import { toLowerCase } from '../modules/utils'

import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'


// export function handleTransfer(event: Transfer): void {
//   if (event.params.tokenId.toString() == '') {
//     return
//   }

//   let contractAddress = event.address.toHexString()
//   let category = getCategory(contractAddress)
//   let id = getNFTId(
//     category,
//     event.address.toHexString(),
//     event.params.tokenId.toString()
//   )

//   let nft = new NFT(id)

//   nft.tokenId = event.params.tokenId
//   nft.owner = event.params.to.toHex()
//   nft.contractAddress = event.address
//   nft.category = category
//   nft.updatedAt = event.block.timestamp

//   if (contractAddress != addresses.LANDRegistry) {
//     // The LANDRegistry contract does not have a tokenURI method
//     nft.tokenURI = getTokenURI(event)
//   }

//   if (isMint(event)) {
//     nft.createdAt = event.block.timestamp

//     // We're defaulting "Estate size" to one to allow the frontend to search for `searchEstateSize_gt: 0`,
//     // necessary because thegraph doesn't support complex queries and we can't do `OR` operations
//     nft.searchEstateSize = 1

//     // We default the "in bounds" property for parcels and no-parcels alike so we can just add  `searchParcelIsInBounds: true`
//     // to all queries
//     nft.searchParcelIsInBounds = true

//     nft.searchText = ''

//     nft.searchIsLand = false

//     let metric = buildCountFromNFT(nft)
//     metric.save()
//   } else {
//     let oldNFT = NFT.load(id)
//     if (cancelActiveOrder(oldNFT!, event.block.timestamp)) {
//       nft = clearNFTOrderProperties(nft!)
//     }
//   }

//   if (category == categories.PARCEL) {
//     let parcel: Parcel
//     if (isMint(event)) {
//       parcel = buildParcelFromNFT(nft)
//       nft.parcel = id
//       nft.image = getParcelImage(parcel)
//       nft.searchIsLand = true
//       nft.searchParcelIsInBounds = isInBounds(parcel.x, parcel.y)
//       nft.searchParcelX = parcel.x
//       nft.searchParcelY = parcel.y
//       nft.searchText = getParcelText(parcel, '')
//     } else {
//       parcel = new Parcel(nft.id)
//       parcel.owner = nft.owner
//     }
//     parcel.save()
//   } else if (category == categories.ESTATE) {
//     let estate: Estate
//     if (isMint(event)) {
//       estate = buildEstateFromNFT(nft)
//       nft.estate = id
//       nft.image = getEstateImage(estate)
//       nft.searchIsLand = true
//       nft.searchEstateSize = estate.size
//     } else {
//       estate = new Estate(nft.id)
//       estate.owner = nft.owner
//     }
//     estate.save()
//   } else if (category == categories.WEARABLE) {
//     let wearable: Wearable
//     if (isMint(event)) {
//       wearable = buildWearableFromNFT(nft)
//       if (wearable.id != '') {
//         nft.wearable = id
//         nft.name = wearable.name
//         nft.image = getWearableImage(wearable)
//         nft.searchIsWearableHead = isWearableHead(wearable)
//         nft.searchIsWearableAccessory = isWearableAccessory(wearable)
//         nft.searchWearableCategory = wearable.category
//         nft.searchWearableBodyShapes = wearable.bodyShapes
//         nft.searchWearableRarity = wearable.rarity
//         nft.searchText = toLowerCase(wearable.name)
//       }
//     } else {
//       wearable = new Wearable(nft.id)
//       wearable.owner = nft.owner
//     }
//     wearable.save()
//   } else if (category == categories.ENS) {
//     let ens: ENS
//     if (isMint(event)) {
//       ens = buildENSFromNFT(nft)
//       nft.ens = ens.id
//     } else {
//       ens = new ENS(nft.id)
//       ens.owner = nft.owner
//     }
//     ens.save()
//   } else if (category == categories.BOARDINGPASS) {
//     let boardingpass: Boardingpass
//     if (isMint(event)) {
//       boardingpass = buildBoardingpassFromNFT(nft)
//       if (boardingpass.id != '') {
//         nft.boardingpass = id
//         nft.image = getBoardingpassImage(boardingpass)
//         nft.name = boardingpass.name
//       }
//     } else {
//       boardingpass = new Boardingpass(nft.id)
//       boardingpass.owner = nft.owner
//     }
//     boardingpass.save()

//   }

//   createAccount(event.params.to)

//   nft.save()
// }



export function handleDetailedTransfer(event: DetailedTransfer): void {
  if (event.params.tokenId.toString() == '') {
    return
  }

  let contractAddress = event.address.toHexString()
  let category = getCategoryByIndex(event.params.cateory)
  // let subcategory = getSubCategoryByIndex(event.params.subcategory)
  let subcategory = BigInt.fromI32(event.params.subcategory)
  let id = event.params.tokenId.toString()

  let nft = new NFT(id)

  nft.tokenId = event.params.tokenId
  nft.owner = event.params.to.toHex()
  nft.contractAddress = event.address
  nft.category = category
  nft.updatedAt = event.block.timestamp

  if (contractAddress != addresses.LANDRegistry) {
    // The LANDRegistry contract does not have a tokenURI method
    nft.tokenURI = getTokenURI(event)
  }

  if (isMint(event)) {
    nft.createdAt = event.block.timestamp

    // We're defaulting "Estate size" to one to allow the frontend to search for `searchEstateSize_gt: 0`,
    // necessary because thegraph doesn't support complex queries and we can't do `OR` operations
    nft.searchEstateSize = 1

    // We default the "in bounds" property for parcels and no-parcels alike so we can just add  `searchParcelIsInBounds: true`
    // to all queries
    // nft.searchParcelIsInBounds = true

    nft.searchText = ''

    nft.searchIsLand = false

    let metric = buildCountFromNFT(nft)
    metric.save()
  } else {
    let oldNFT = NFT.load(id)
    if (cancelActiveOrder(oldNFT!, event.block.timestamp)) {
      nft = clearNFTOrderProperties(nft!)
    }
  }

  if (category == categories.BOARDINGPASS) {
    let boardingpass: Boardingpass
    if (isMint(event)) {
      nft.subcategory = subcategory
      boardingpass = buildBoardingpassFromNFT(nft)
      nft.boardingpass = id
      nft.image = getBoardingpassImage(boardingpass)
      nft.thumbnail = getBoardingpassThumbnail(boardingpass)
      nft.searchText = id
      nft.name = getBoardingpassName(boardingpass)
    } else {
      boardingpass = new Boardingpass(nft.id)
      boardingpass.owner = nft.owner
    }
    boardingpass.save()
  }
  else if (category == categories.LAND) {
    let land: Land
    if (isMint(event)) {
      nft.subcategory = subcategory

      land = buildLandFromNFT(nft)
      nft.land = id
      nft.searchIsLand = true
      nft.image = getLandImage(land)
      nft.thumbnail = getLandImage(land)
      nft.searchText = getLandSearchText(land)
      nft.name = getLandName(land)
    } else {
      land = new Land(nft.id)
      land.owner = nft.owner
    }
    land.save()
  }
  else if (category == categories.BUILDING) {
    let building: Building
    if (isMint(event)) {
      nft.subcategory = subcategory
      building = buildBuildingFromNFT(nft)
      nft.building = id
      nft.image = getBuildingImage(building)
      nft.thumbnail = getBuildingImage(building)
      nft.name = getBuildingName(building)
      nft.searchText = nft.name
      building.rarity = BigInt.fromI32(event.params.rarity)

    } else {
      building = new Building(nft.id)
      building.owner = nft.owner
    }
    building.save()
  }
  else if (category == categories.TOWER) {
    let tower: Tower
    if (isMint(event)) {
      nft.subcategory = subcategory
      tower = buildTowerFromNFT(nft)
      nft.tower = id
      nft.image = getTowerImage(tower)
      nft.thumbnail = getTowerThumbnail(tower)
      nft.name = getTowerName(tower)
      nft.searchText = nft.name
      tower.rarity = BigInt.fromI32(event.params.rarity)
    } else {
      tower = new Tower(nft.id)
      tower.owner = nft.owner
    }
    tower.save()
  }
  else if (category == categories.TRAP) {
    let trap: Trap
    if (isMint(event)) {
      nft.subcategory = subcategory
      trap = buildTrapFromNFT(nft)
      nft.trap = id
      nft.image = getTrapImage(trap)
      nft.thumbnail = getTrapThumbnail(trap)
      nft.name = getTrapName(trap)
      nft.searchText = nft.name
      trap.rarity = BigInt.fromI32(event.params.rarity)
    } else {
      trap = new Trap(nft.id)
      trap.owner = nft.owner
    }
    trap.save()
  }


  createAccount(event.params.to)

  nft.save()
}