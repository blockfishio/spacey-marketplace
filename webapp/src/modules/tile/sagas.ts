import {
  takeEvery,
  call,
  put
} from 'redux-saga/effects'
import {
  // Atlas,
  AtlasTile
} from 'decentraland-ui'
// import { ATLAS_URL } from '../../modules/vendor/decentraland'
import {
  FETCH_TILES_REQUEST,
  FetchTilesRequestAction,
  fetchTilesSuccess,
  fetchTilesFailure,
  DEFAULT_BASE_TILE_PARAMS
} from './actions'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { fetchNFTsRequest } from '../nft/actions'
import { Vendors } from '../vendor'
import { VendorFactory, Vendor } from '../vendor/VendorFactory'
import { NFTsFetchFilters } from '../vendor/decentraland/nft/types'
import { View } from '../ui/types'
import { AwaitFn } from '../types'
import { tileMap, offset } from "../constant/tilemap"
import { fromWei } from 'web3x-es/utils'


export function* tileSaga() {
  yield takeEvery(FETCH_TILES_REQUEST, handleFetchTilesRequest)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleFetchTilesRequest(_action: FetchTilesRequestAction) {
  try {
    // console.log(ATLAS_URL + '/tiles')
    // const tiles: Record<string, AtlasTile> = yield call(() =>
    //   Atlas.fetchTiles(ATLAS_URL + '/tiles')
    // )
    const { nftService } = VendorFactory.build(Vendors.DECENTRALAND) as Vendor<Vendors.DECENTRALAND>
    const filter: NFTsFetchFilters = { isLand: true }
    const [
      nfts,
      _,
      orders,
      // count
    ]: AwaitFn<typeof nftService.fetch> = yield call(() =>
      // TODO: This `as any` is here because Typescript joins (&) filter types instead of adding them as an or (|)
      nftService.fetch(DEFAULT_BASE_TILE_PARAMS, filter)
    )
    let mytile: Record<string, AtlasTile> = {}
    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i]
      const t = tileMap[parseInt(nft.tokenId) - offset]
      const cord = t.split(',')
      // const x = parseInt(cord[0])
      // const y = parseInt(cord[1])
      const center_x: number = parseInt(nft.data.land?.x || cord[0])
      const center_y: number = parseInt(nft.data.land?.y || cord[1])

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const x = center_x + i;
          const y = center_y + j;
          const cord_online = x.toString() + "," + y.toString()
          const tile: any = { x, y, type: 1, owner: nft.owner, estate_id: nft.tokenId, top: 1, left: 1, topLeft: 1 }
          mytile[cord_online] = tile

        }
      }
      // const x = nft.data.land?.x || parseInt(cord[0])
      // const y = nft.data.land?.y || parseInt(cord[1])


    }
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      if (order) {
        const t = tileMap[parseInt(order.tokenId) - offset]
        const cord = t.split(',')
        const center_x = parseInt(cord[0])
        const center_y = parseInt(cord[1])

        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            const x = center_x + i;
            const y = center_y + j;
            const cord_online = x.toString() + "," + y.toString()
            const tile: any = { ...mytile[cord_online], price: fromWei(order.price, 'ether') }
            mytile[cord_online] = tile

          }
        }
      }
    }

    // tileMap.slice(count).forEach(t => {
    //   const cord = t.split(',')
    //   const x = parseInt(cord[0])
    //   const y = parseInt(cord[1])

    //   const tile: any = { x, y, type: 7, owner: "", name: "Center" }
    //   mytile[t] = tile

    // })
    // yield put(fetchTilesSuccess(tiles))
    yield put(fetchTilesSuccess(mytile))


  } catch (error) {
    yield put(fetchTilesFailure(error.message))
  }
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield put(
    fetchNFTsRequest({
      vendor: Vendors.DECENTRALAND,
      view: View.ATLAS,
      params: {
        first: 1000,
        skip: 0,
        address: action.payload.wallet.address.toLowerCase()
      },
      filters: {
        isLand: true
      }
    })
  )
}
