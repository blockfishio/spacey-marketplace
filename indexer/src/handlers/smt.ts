import { Address } from '@graphprotocol/graph-ts'
import { ConstructorCall, RoleGranted } from '../entities/SMT/SMT'
import { ERC721 } from '../entities/templates'
import { buildCount } from '../modules/count'
import {
  Boardingpass

} from '../data/addresses'
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'

export function handleRoleGranted(_: RoleGranted): void {
  let count = buildCount()

  if (count.started == 0) {
    ERC721.create(Address.fromString(Boardingpass))

    count.started = 1
    count.save()
  }
}

