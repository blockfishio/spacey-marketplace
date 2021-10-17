import {
  WearableCategory,
  WearableRarity,
  WearableGender
} from '../../../nft/wearable/types'
import { ContractName } from '../ContractService'

export type NFTsFetchFilters = {
  isLand?: boolean,
  isOffical?: boolean,
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: WearableRarity[]
  wearableGenders?: WearableGender[]
  contracts?: ContractName[]
}
