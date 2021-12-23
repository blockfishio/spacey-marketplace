import { BidService } from './BidService'
import { ContractService } from './ContractService'
import { NFTService } from './NFTService'
import { OrderService } from './OrderService'
import { AssetService } from './AssetService'
import { OwnerAssetService } from './OwnerAssetService'
import { ClaimMetamarsService } from './ClaimMetamarsService'

export * from './bid'
export * from './land'
export * from './nft'
export * from './order'
export * from './routing'
export * from './asset'

export * from './BidService'
export * from './ContractService'
export * from './NFTService'
export * from './OrderService'
export * from './AssetService'
export * from './OwnerAssetService'
export * from './ClaimMetamarsService'

export const services = {
  BidService,
  ContractService,
  NFTService,
  OrderService,
  AssetService,
  OwnerAssetService,
  ClaimMetamarsService
}
