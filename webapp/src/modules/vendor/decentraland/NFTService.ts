import { Address } from 'web3x-es/address'

import { ERC721 } from '../../../contracts/ERC721'
import { ContractFactory } from '../../contract/ContractFactory'
import { locations } from '../../routing/locations'
import { NFT, NFTsFetchParams, NFTsCountParams } from '../../nft/types'
import { Order } from '../../order/types'
import { Account } from '../../account/types'
// import { isExpired } from '../../order/utils'
import { NFTService as NFTServiceInterface } from '../services'
import { NFTsFetchFilters } from './nft/types'
import { Vendors } from '../types'
import { nftAPI } from './nft/api'
import { NFTFragment } from './nft/fragments'
// import { ContractService } from './ContractService'
import { MAX_QUERY_SIZE } from './api'





export class NFTService implements NFTServiceInterface<Vendors.DECENTRALAND> {
  async fetch(params: NFTsFetchParams, filters?: NFTsFetchFilters) {

    const { data: results, total } = await nftAPI.fetch(params, filters)
    const nfts: NFT[] = []
    const accounts: Account[] = []
    const orders: Order[] = []
    for (const result of results) {

      const address = result.nft.owner
      let account = accounts.find(account => account.id === address)
      if (!account) {
        account = this.toAccount(address)
      }
      account.nftIds.push(result.nft.id)
      nfts.push({ ...result.nft, vendor: Vendors.DECENTRALAND })
      if (result.order) {
        orders.push(result.order)
      }
    }
    return [nfts, accounts, orders, total] as const
  }

  async count(countParams: NFTsCountParams, filters?: NFTsFetchFilters) {
    const params: NFTsFetchParams = {
      ...countParams,
      first: MAX_QUERY_SIZE,
      skip: 0
    }
    return nftAPI.count(params, filters)
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    // const remoteNFT = await nftAPI.fetchOne(contractAddress, tokenId)

    // const nft = this.toNFT(remoteNFT)
    // const order = this.toOrder(remoteNFT)

    // if (order && !isExpired(order.expiresAt!)) {
    //   nft.activeOrderId = order.id
    // }
    const response = await nftAPI.fetchOne(contractAddress, tokenId)
    const nft: NFT = { ...response.nft, vendor: Vendors.DECENTRALAND }
    return [nft, response.order || undefined] as const



  }




  async transfer(fromAddress: string, toAddress: string, nft: NFT) {
    if (!fromAddress) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    const from = Address.fromString(fromAddress)
    const to = Address.fromString(toAddress)

    const erc721 = await ContractFactory.build(ERC721, nft.contractAddress)

    return erc721.methods
      .transferFrom(from, to, nft.tokenId)
      .send({ from })
      .getTxHash()
  }

  toNFT(nft: NFTFragment): NFT<Vendors.DECENTRALAND> {
    return {
      id: nft.id,
      tokenId: nft.tokenId,
      contractAddress: nft.contractAddress,
      activeOrderId: '',
      owner: nft.owner.address.toLowerCase(),
      name: nft.name,
      image: nft.image,
      thumbnail: nft.thumbnail,
      url: locations.nft(nft.contractAddress, nft.tokenId),
      data: {
        parcel: nft.parcel,
        estate: nft.estate,
        wearable: nft.wearable,
        ens: nft.ens,
        boardingpass: nft.boardingpass,
        land: nft.land,
        building: nft.building,
        tower: nft.tower,
        trap: nft.trap
      },
      category: nft.category,
      vendor: Vendors.DECENTRALAND
    }
  }

  // toOrder(nft: NFTFragment): Order | undefined {
  //   let order: Order | undefined

  //   if (nft.activeOrder) {
  //     order = {
  //       ...nft.activeOrder,
  //       marketAddress: ContractService.contractAddresses.Marketplace,
  //       nftId: nft.id
  //     }
  //   }

  //   return order
  // }

  toAccount(address: string): Account {
    return {
      id: address,
      address,
      nftIds: []
    }
  }
}
