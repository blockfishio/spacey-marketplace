// import { gql } from 'apollo-boost'

// import { client } from '../api'
// import { orderFragment, OrderFragment } from './fragments'



import { BaseAPI } from 'decentraland-dapps/dist/lib/api'
import { Order, OrderStatus } from '../../../order/types'
import { NFT_SERVER_URL } from '../nft'

class OrderAPI extends BaseAPI {
  // async fetchByNFT(nftId: string) {
  //   const { data } = await client.query<{ orders: OrderFragment[] }>({
  //     query: NFT_ORDERS_QUERY,
  //     variables: { nftId }
  //   })
  //   return data.orders
  // }

  async fetchByNFT(
    contractAddress: string,
    tokenId: string,
    status?: OrderStatus
  ): Promise<Order[]> {
    const response: { data: Order[]; total: number } = await this.request(
      'get',
      '/orders',
      { contractAddress, tokenId, status }
    )
    return response.data
  }




}











// const NFT_ORDERS_QUERY = gql`
//   query NFTOrders($nftId: String!) {
//     orders(
//       where: { nft: $nftId, status: sold }
//       orderBy: createdAt
//       orderDirection: desc
//     ) {
//       ...orderFragment
//     }
//   }
//   ${orderFragment()}
// `

export const orderAPI = new OrderAPI(NFT_SERVER_URL)
