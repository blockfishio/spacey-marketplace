import { gql } from 'apollo-boost'

import { BaseAPI } from 'spacey-dapps/dist/lib/api'
import { NFTsFetchParams } from '../../../nft/types'
import { ContractService } from '../ContractService'
// import { contractAddressesAll } from '../../../contract/utils'

import { client } from '../api'
import { nftFragment, NFTFragment } from './fragments'
import { NFTsFetchFilters, NFTResult, NFTResponse } from './types'
import { getNFTSortBy } from '../../../routing/search'


export const NFT_SERVER_URL = process.env.REACT_APP_NFT_SERVER_URL!
export const OFFICAL_ADDRESS = process.env.REACT_APP_OFFICAL_ADDRESS!

class NFTAPI extends BaseAPI {

  fetch = async (params: NFTsFetchParams, filters?: NFTsFetchFilters) => {
    // const query = getNFTsQuery(params, filters)
    // const variables = this.buildFetchVariables(params, filters)
    const queryParams = this.buildNFTQueryString(params, filters)
    return this.request('get', `/nfts?${queryParams}`)

    // const { data } = await client.query<{ nfts: NFTFragment[] }>({
    //   query,
    //   variables
    // })
    // return data.nfts
  }

  async count(params: NFTsFetchParams, filters?: NFTsFetchFilters) {
    const countQuery = getNFTsCountQuery(params, filters)
    const variables = this.buildFetchVariables(params, filters)

    const { data } = await client.query<{ nfts: NFTFragment[] }>({
      query: countQuery,
      variables
    })

    return data.nfts.length
  }

  async fetchOne(contractAddress: string, tokenId: string): Promise<NFTResult> {
    // const { data } = await client.query<{ nfts: NFTFragment[] }>({
    //   query: NFT_BY_ADDRESS_AND_ID_QUERY,
    //   variables: {
    //     contractAddress,
    //     tokenId
    //   }
    // })
    // return data.nfts[0]
    const response: NFTResponse = await this.request('get', '/nfts', {
      contractAddress,
      tokenId
    })

    if (response.data.length === 0) {
      throw new Error('Not found')
    }

    return response.data[0]
  }
  async fetchTokenId(x: number, y: number) {
    const { data } = await client.query<{ parcels: { tokenId: string }[] }>({
      query: PARCEL_TOKEN_ID_QUERY,
      variables: { x, y },
      fetchPolicy: 'cache-first'
    })
    const { tokenId } = data.parcels[0]
    return tokenId
  }

  private buildFetchVariables(
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters
  ) {
    return {
      ...params,
      ...filters,
      expiresAt: Date.now().toString(),
      a: '0x7e307e41b6d31b8591145bd9625e3d1bcab55d95'
    }
  }

  private buildNFTQueryString(
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters
  ): string {
    const queryParams = new URLSearchParams()
    queryParams.append('first', params.first.toString())
    queryParams.append('skip', params.skip.toString())
    if (params.orderBy) {
      queryParams.append('sortBy', getNFTSortBy(params.orderBy))
    }
    if (params.category) {
      queryParams.append('category', params.category)
    }
    if (params.address) {
      queryParams.append('owner', params.address)
    }
    if (params.onlyOnSale) {
      queryParams.append('isOnSale', 'true')
    }

    if (params.search) {
      queryParams.set('search', params.search)
    }

    if (params.rarities) {
      for (const rarity of params.rarities) {
        queryParams.append('itemRarity', rarity.toLowerCase())


      }
    }

    if (filters) {

      if (filters.isLand) {
        queryParams.append('isLand', 'true')
      }
      if (filters.isOffical === true) {
        queryParams.append('owner', OFFICAL_ADDRESS)
      }
      else if (filters.isOffical === false) {
        queryParams.append('ownernot', OFFICAL_ADDRESS)
      }


      // if (filters.contracts) {
      //   for (const address of filters.contracts) {
      //     if (contractAddressesAll.some(contract => contract.address === address)) {
      //       queryParams.append('contractAddress', address)
      //     }
      //   }
      // }
      if (filters.network) {
        queryParams.append('network', filters.network)
      }
    }

    return queryParams.toString()
  }
}

const NFTS_FILTERS = `
  $first: Int
  $skip: Int
  $orderBy: String
  $orderDirection: String

  $expiresAt: String
  $address: String
  $a:String
  $category: Category
  $isLand: Boolean
`

const NFTS_ARGUMENTS = `
  first: $first
  skip: $skip
  orderBy: $orderBy
  orderDirection: $orderDirection
`

function getNFTsCountQuery(
  params: NFTsFetchParams,
  filters: NFTsFetchFilters = {}
) {
  return getNFTsQuery(params, filters, true)
}

function getNFTsQuery(
  params: NFTsFetchParams,
  filters: NFTsFetchFilters = {},
  isCount = false
) {
  let extraWhere: string[] = []

  if (params.address) {
    extraWhere.push('owner: $address')
    // extraWhere.push('owner_not: $officalAddr')
  }
  if (params.category) {
    extraWhere.push('category: $category')
  }

  if (params.onlyOnSale) {
    extraWhere.push('searchOrderStatus: open')
    extraWhere.push('searchOrderExpiresAt_gt: $expiresAt')
  }

  if (params.search) {
    extraWhere.push(
      `searchText_contains: "${params.search.trim().toLowerCase()}"`
    )
  }

  // if (filters.wearableCategory) {
  //   extraWhere.push('searchWearableCategory: $wearableCategory')
  // }

  if (filters.isLand) {
    extraWhere.push('searchIsLand: $isLand')
  }
  if (filters.isOffical === true) {
    extraWhere.push('owner: $a')
  }
  else if (filters.isOffical === false) {
    extraWhere.push('owner_not: $a')
  }



  if (filters.contracts && filters.contracts.length > 0) {
    const { contractAddresses } = ContractService
    extraWhere.push(
      `contractAddress_in: [${filters.contracts
        .map(contract => `"${contractAddresses[contract]}"`)
        .join(', ')}]`
    )
  }

  return gql`
    query NFTs(
      ${NFTS_FILTERS}
    ) {
      nfts(
        where: {
          searchEstateSize_gt: 0
          ${extraWhere.join('\n')}
        }
        ${NFTS_ARGUMENTS}
      ) {
        ${isCount ? 'id' : '...nftFragment'}
      }
    }
    ${isCount ? '' : nftFragment()}
  `
}

// const NFT_BY_ADDRESS_AND_ID_QUERY = gql`
//   query NFTByTokenId($contractAddress: String, $tokenId: String) {
//     nfts(
//       where: { contractAddress: $contractAddress, tokenId: $tokenId }
//       first: 1
//     ) {
//       ...nftFragment
//     }
//   }
//   ${nftFragment()}
// `

const PARCEL_TOKEN_ID_QUERY = gql`
  query ParcelTokenId($x: BigInt, $y: BigInt) {
    lands(where: { x: $x, y: $y }) {
      tokenId
    }
  }
`

export const nftAPI = new NFTAPI(NFT_SERVER_URL)
