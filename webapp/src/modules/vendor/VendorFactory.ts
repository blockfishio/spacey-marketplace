import { services as decentraland } from './decentraland'

import {
  ContractService,
  NFTService,
  OrderService,
  BidService,
  AssetService,
  OwnerAssetService,
  ClaimMetamarsService
} from './services'
import { Vendors } from './types'

export class VendorFactory {
  static build(vendor: Vendors) {
    switch (vendor) {
      case Vendors.DECENTRALAND:
        return new Vendor<Vendors.DECENTRALAND>(
          vendor,
          new decentraland.ContractService(),
          new decentraland.NFTService(),
          new decentraland.OrderService(),
          new decentraland.AssetService(),
          new decentraland.BidService(),

          new decentraland.OwnerAssetService(),
          new decentraland.ClaimMetamarsService()
        )

      default:
        throw new Error(`Invalid vendor "${vendor}"`)
    }
  }
}

export class Vendor<V extends Vendors> {
  constructor(
    public type: V,
    public contractService: ContractService,
    public nftService: NFTService<V>,
    public orderService: OrderService<V>,
    public assetService: AssetService,
    public bidService?: BidService<V>,
    public ownerassetService?: OwnerAssetService,
    public claimMetamarsService?: ClaimMetamarsService
  ) { }
}
