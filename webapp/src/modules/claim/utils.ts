import addDays from 'date-fns/addDays'
import dateFnsFormat from 'date-fns/format'
import { Claimable, Networks } from './types'
import { Eth } from 'web3x/eth'
import { Address } from 'web3x/address'

import claimabi from '../../contracts/Claim.json'

import {
  //  PopulatedTransaction,
  Contract, providers,
  //  utils
} from 'ethers'




import {
  getConnectedProvider,
  getConnectedProviderChainId,
  getNetworkProvider

  // getConnectedProviderType,
} from 'spacey-dapps/dist/lib/eth'
import { getChainConfiguration } from 'spacey-dapps/dist/lib/chainConfiguration'
import { Network } from '@spacey2025/schemas/dist/dapps/network'
import { ChainId } from '@spacey2025/schemas'


export const DEFAULT_EXPIRATION_IN_DAYS = 30
export const INPUT_FORMAT = 'yyyy-MM-dd'
export const getDefaultExpirationDate = (date = Date.now()) =>
  dateFnsFormat(
    addDays(new Date(date), DEFAULT_EXPIRATION_IN_DAYS),
    INPUT_FORMAT
  )

export function isExpired(expiresAt: string) {
  return parseInt(expiresAt, 10) < Date.now()
}



export async function fetchClaimable(): Promise<Claimable> {
  const provider = await getConnectedProvider()

  if (!provider) {
    // This could happen if metamask is not installed
    throw new Error('Could not connect to Ethereum')
  }

  const eth = new Eth(provider)

  //@ts-ignore
  const accounts: Address[] = await eth.getAccounts()
  if (accounts.length === 0) {
    // This could happen if metamask was not enabled
    throw new Error('Could not get address')
  }

  const address = accounts[0].toString()
  const chainId = await eth.getId()
  const chainConfig = getChainConfiguration(chainId)
  const expectedChainId = getConnectedProviderChainId()!
  const expectedChainConfig = getChainConfiguration(expectedChainId)

  const networks: Partial<Networks> = {}

  for (const network of Object.keys(chainConfig.networkMapping)) {


    const networkChainId = expectedChainConfig.networkMapping[network as Network]
    networks[network as Network] = {
      chainId: networkChainId,
      claimable: await fetchClaimableMars(networkChainId, address)
    }
  }
  return {
    address: address.toLowerCase(),
    networks: networks as Networks,
    network: chainConfig.network,
    chainId
  }
}


export async function fetchClaimableMars(chainId: ChainId, address: string) {
  try {
    const provider = await getNetworkProvider(chainId)
    const contract = getClaimContract(chainId)
    const mars = new Contract(
      contract.address,
      contract.abi,
      new providers.Web3Provider(provider)
    )
    const balance = await mars.claimableToken(address)
    return parseFloat(balance)
  } catch (error) {
    return 0
  }
}

function getClaimContract(chainId: ChainId) {
  const marsAddresses = {
    [ChainId.ETHEREUM_MAINNET]: '0x58fad9e3c3ae54c9ba98c3f0e4bf88ab3e8cf3c5',
    [ChainId.ETHEREUM_ROPSTEN]: '0x4Eb8f76bC1ec5fCACdE01D909A8Ce87C33fCC80B',
    [ChainId.ETHEREUM_RINKEBY]: '0x4Eb8f76bC1ec5fCACdE01D909A8Ce87C33fCC80B',
    [ChainId.ETHEREUM_GOERLI]: '0x4Eb8f76bC1ec5fCACdE01D909A8Ce87C33fCC80B',
    [ChainId.ETHEREUM_KOVAN]: '0x4Eb8f76bC1ec5fCACdE01D909A8Ce87C33fCC80B',
    [ChainId.BSC_TESTNET]: '0xF0786A6D75Fbd3417DC9a3f5119088ddea4bf940',
    [ChainId.BSC_MAINNET]: '0xB3fE6261382c27323B115AA5B92C66B306F94328',
    [ChainId.MATIC_MAINNET]: '0x4Eb8f76bC1ec5fCACdE01D909A8Ce87C33fCC80B',
    [ChainId.MATIC_MUMBAI]: '0x4Eb8f76bC1ec5fCACdE01D909A8Ce87C33fCC80B'
  }

  const res = {
    abi: claimabi,
    address: marsAddresses[chainId],
    name: "Claim",
    version: "1.0",
    chainId: chainId
  }
  return res
}