import { action } from 'typesafe-actions'
import { AtlasTile } from 'spacey-ui'
import { NFTsFetchParams, NFTSortBy } from '../nft/types'
import { SortDirection } from '../routing/types'



export const FETCH_TILES_REQUEST = '[Request] Fetch Tiles'
export const FETCH_TILES_SUCCESS = '[Success] Fetch Tiles'
export const FETCH_TILES_FAILURE = '[Failure] Fetch Tiles'

export const fetchTilesRequest = () => action(FETCH_TILES_REQUEST)
export const fetchTilesSuccess = (tiles: Record<string, AtlasTile>) =>
  action(FETCH_TILES_SUCCESS, { tiles })
export const fetchTilesFailure = (error: string) =>
  action(FETCH_TILES_FAILURE, { error })

export type FetchTilesRequestAction = ReturnType<typeof fetchTilesRequest>
export type FetchTilesSuccessAction = ReturnType<typeof fetchTilesSuccess>
export type FetchTilesFailureAction = ReturnType<typeof fetchTilesFailure>

export const DEFAULT_BASE_TILE_PARAMS: NFTsFetchParams = {
  first: 720,
  skip: 0,
  orderBy: NFTSortBy.CREATED_AT,
  orderDirection: SortDirection.DESC,
  onlyOnSale: false
}