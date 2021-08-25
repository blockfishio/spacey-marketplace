import { NFT, Order, Count } from '../../entities/schema'
import * as categories from '../category/categories'
import * as addresses from '../../data/addresses'
import { ConstructorCall } from '../../entities/templates/ERC721/Asset'

export const DEFAULT_ID = 'all'

export function buildCount(): Count {
  let count = Count.load(DEFAULT_ID)
  if (count == null) {
    count = new Count(DEFAULT_ID)

    count.orderTotal = 0
    count.orderBoardingpass = 0
    count.orderLand = 0
    count.orderBuilding = 0
    count.orderTower = 0
    count.orderTrap = 0

    count.boardingpassTotal = 0
    count.landTotal = 0
    count.buildingTotal = 0
    count.towerTotal = 0
    count.trapTotal = 0





    count.started = 0

  }
  return count as Count
}

export function buildCountFromNFT(nft: NFT): Count {
  let category = nft.category
  let count = buildCount()

  if (category == categories.BOARDINGPASS) {
    count.boardingpassTotal += 1
  }
  else if (category == categories.BUILDING) {
    count.buildingTotal += 1
  }
  else if (category == categories.LAND) {
    count.landTotal += 1
  }
  else if (category == categories.TOWER) {
    count.towerTotal += 1
  }
  else if (category == categories.TRAP) {
    count.trapTotal += 1
  }

  return count
}

export function buildCountFromOrder(order: Order): Count {
  let category = order.category
  let count = buildCount()
  // count.orderTotal += 1

  if (category == categories.BOARDINGPASS) {
    count.orderBoardingpass += 1
  }
  else if (category == categories.BUILDING) {
    count.orderBuilding += 1
  }
  else if (category == categories.LAND) {
    count.orderLand += 1
  }
  else if (category == categories.TOWER) {
    count.orderTower += 1
  }
  else if (category == categories.TRAP) {
    count.orderTrap += 1
  }
  return count
}
