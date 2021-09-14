import { ContractService as ContractServiceInterface } from '../services'
import { Network, ChainId } from '../../contract/types'
import { NFTCategory } from '../../nft/types'
import { TransferType } from '../types'

const network = process.env.REACT_APP_NETWORK! as Network

const contractAddresses = {
  [Network.ROPSTEN]: {
    MANAToken: "0x0Bb7DD2B4C3792Bf259899df4a83a3cD9DC48E58",
    Marketplace: '0xe6741bf1ed6dd3da0f5453922fce930a2b495623',
    AssetSale: '0x254519a142151cb8d7c42798c8ce5a37d6712490',
    Bids: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    SpaceY2025: '0x11aff557bf2c052b4751628a878fd23e05f5d99d'
  },
  [Network.MAINNET]: {
    MANAToken: '0x58fad9e3c3ae54c9ba98c3f0e4bf88ab3e8cf3c5',
    Marketplace: '0x9e78a8bdbddde4bf49c241c0e37f524cfd4dabbe',
    Bids: '0xe479dfd9664c693b2e2992300930b00bfde08233',
    AssetSale: '0xb7edde8207fd4a7214acf66deaf647182db360bc',
    SpaceY2025: '0x46741b56c57b6c2470e9ead3cd6ee13bb2a4fe7b'
  },
  [Network.BSC]: {
    MANAToken: "0x13A637026dF26F846D55ACC52775377717345c06",
    Marketplace: '0x513c944c42a1345E993aE026d5c4acE70d425879',
    AssetSale: '0xb0FbC92561C1B0F336C5f9D91fe96c84C0b00853',
    Bids: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    SpaceY2025: '0x230185C3B02b897B89cb1e62717AD7772b8319DA'
  },
  [Network.BSCTEST]: {
    MANAToken: "0x8718a9E002A9c3EA453466eb5D8e6079e99F14A3",
    Marketplace: '0x68e640fC786eEF03F04825Ed790B8d3B53272033',
    AssetSale: '0x939F06c7237fBeAee33dE637730bA4E618d491b9',
    Bids: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    SpaceY2025: '0x37C2c3727aF94eA607465Da8E6C631DDB3010eF8'
  }
}[network]

const contractAddressesAll = {
  [ChainId.ETHEREUM_ROPSTEN]: {
    MANAToken: "0x0Bb7DD2B4C3792Bf259899df4a83a3cD9DC48E58",
    Marketplace: '0xe6741bf1ed6dd3da0f5453922fce930a2b495623',
    AssetSale: '0x254519a142151cb8d7c42798c8ce5a37d6712490',
    Bids: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    SpaceY2025: '0x11aff557bf2c052b4751628a878fd23e05f5d99d'
  },
  [ChainId.ETHEREUM_MAINNET]: {
    MANAToken: '0x58fad9e3c3ae54c9ba98c3f0e4bf88ab3e8cf3c5',
    Marketplace: '0x9e78a8bdbddde4bf49c241c0e37f524cfd4dabbe',
    Bids: '0xe479dfd9664c693b2e2992300930b00bfde08233',
    AssetSale: '0xb7edde8207fd4a7214acf66deaf647182db360bc',
    SpaceY2025: '0x46741b56c57b6c2470e9ead3cd6ee13bb2a4fe7b'
  },
  [ChainId.BSC_MAINNET]: {
    MANAToken: "0xEbf1CD092aB077bc9B61a8942D993122f7b7dAb8",
    Marketplace: '0x513c944c42a1345E993aE026d5c4acE70d425879',
    AssetSale: '0xb0FbC92561C1B0F336C5f9D91fe96c84C0b00853',
    Bids: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    SpaceY2025: '0x230185C3B02b897B89cb1e62717AD7772b8319DA'
  },
  [ChainId.BSC_TESTNET]: {
    MANAToken: "0x8718a9E002A9c3EA453466eb5D8e6079e99F14A3",
    Marketplace: '0x68e640fC786eEF03F04825Ed790B8d3B53272033',
    AssetSale: '0x939F06c7237fBeAee33dE637730bA4E618d491b9',
    Bids: '0x250fa138c0a994799c7a49df3097dc71e37b3d6f',
    SpaceY2025: '0x37C2c3727aF94eA607465Da8E6C631DDB3010eF8'
  }
}


const {
  MANAToken,
  Marketplace,
  Bids,
  AssetSale,
  SpaceY2025
} = contractAddresses

export type ContractName = keyof typeof contractAddresses

export class ContractService implements ContractServiceInterface {

  static contractAddresses = contractAddresses
  static contractAddressesAll = contractAddressesAll
  contractAddressesAll = contractAddressesAll

  contractAddresses = contractAddresses

  contractSymbolsAll = Object.keys(contractAddressesAll).reduce(function (res, chainId) {
    const {
      MANAToken,
      Marketplace,
      Bids,
      AssetSale,
      SpaceY2025
    } = contractAddressesAll[parseInt(chainId) as ChainId]

    const contractSymbols = {
      [MANAToken]: 'SPAY',
      [Marketplace]: 'Marketplace',
      [Bids]: 'Bids',
      [AssetSale]: 'Asset Sale',
      [SpaceY2025]: 'SpaceY2025'
    }
    return { ...res, [chainId]: contractSymbols }


  }, {})


  contractNamesAll = Object.keys(contractAddressesAll).reduce(function (res, chainId) {
    const {
      MANAToken,
      Marketplace,
      Bids,
      AssetSale,
      SpaceY2025
    } = contractAddressesAll[parseInt(chainId) as ChainId]

    const contractNames = {
      [MANAToken]: 'MANAToken',

      [Marketplace]: 'Marketplace',
      [Bids]: 'ERC721Bid',
      [AssetSale]: 'AssetSale',
      [SpaceY2025]: 'SpaceY2025 Assets'
    }
    return { ...res, [chainId]: contractNames }


  }, {})

  contractCategoriesAll = Object.keys(contractAddressesAll).reduce(function (res, chainId) {
    const {
      SpaceY2025
    } = contractAddressesAll[parseInt(chainId) as ChainId]

    const contractCategories = {

      [SpaceY2025]: NFTCategory.LAND
    }
    return { ...res, [chainId]: contractCategories }


  }, {})



  contractSymbols = {
    [MANAToken]: 'SPAY',
    [Marketplace]: 'Marketplace',
    [Bids]: 'Bids',
    [AssetSale]: 'Asset Sale',
    [SpaceY2025]: 'SpaceY2025'
  } as const

  contractNames = {
    [MANAToken]: 'MANAToken',

    [Marketplace]: 'Marketplace',
    [Bids]: 'ERC721Bid',
    [AssetSale]: 'AssetSale',

    [SpaceY2025]: 'SpaceY2025 Assets'
  } as const

  contractCategories = {

    [SpaceY2025]: NFTCategory.LAND
  } as const


  getTransferType(_address: string) {
    return TransferType.SAFE_TRANSFER_FROM
  }




}
