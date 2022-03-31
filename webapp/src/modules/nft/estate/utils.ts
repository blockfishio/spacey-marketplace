import { getConnectedProvider } from 'spacey-dapps/dist/lib/eth'
import { Address } from 'web3x-es/address'
import { contractAddresses } from '../../contract/utils'
import { EstateRegistry } from '../../../contracts/EstateRegistry'
import { Estate } from './types'
import { Eth } from 'web3x-es/eth'

export const getSelection = (estate: Estate) => {
  return estate.parcels.map(pair => ({
    x: +pair.x,
    y: +pair.y
  }))
}

export const getCenter = (selection: { x: number; y: number }[]) => {
  const xs = [...new Set(selection.map(coords => coords.x).sort())]
  const ys = [...new Set(selection.map(coords => coords.y).sort())]
  const x = xs[(xs.length / 2) | 0]
  const y = ys[(ys.length / 2) | 0]
  return [x, y]
}

export async function getFingerprint(estateId: string) {
  const provider = await getConnectedProvider()
  if (provider) {
    const eth = new Eth(provider)
    const estateRegistry = new EstateRegistry(
      eth,
      Address.fromString(contractAddresses.EstateRegistry)
    )
    return estateRegistry.methods.getFingerprint(estateId).call()
  }
}
