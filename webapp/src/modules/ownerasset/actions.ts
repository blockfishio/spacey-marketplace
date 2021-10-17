import { action } from 'typesafe-actions'
import {
  OwnerAsset,
  OwnerAssetsFetchOptions,
  OwnerChest
} from './types'




//Fetch owner assets
export const FETCH_OWNERASSETS_REQUEST = '[Request] Fetch Owner assets'
export const FETCH_OWNERASSETS_SUCCESS = '[Success] Fetch Owner assets'
export const FETCH_OWNERASSETS_FAILURE = '[Failure] Fetch Owner assets'

export const fetchOwnerAssetsRequest = (options: OwnerAssetsFetchOptions) =>
  action(FETCH_OWNERASSETS_REQUEST, {
    options: options,
    timestamp: Date.now()
  })


export const fetchOwnerAssetsSuccess = (
  options: OwnerAssetsFetchOptions,
  chests: OwnerChest[],
  assets: OwnerAsset[],
  count: number,
  timestamp: number
) =>
  action(FETCH_OWNERASSETS_SUCCESS, {
    options,
    chests,
    assets,
    count,
    timestamp
  })
export const fetchOwnerAssetsFailure = (
  options: OwnerAssetsFetchOptions,
  error: string,
  timestamp: number
) => action(FETCH_OWNERASSETS_FAILURE, {
  options,
  error, timestamp
})







export type FetchOwnerAssetsRequestAction = ReturnType<typeof fetchOwnerAssetsRequest>
export type FetchOwnerAssetsSuccessAction = ReturnType<typeof fetchOwnerAssetsSuccess>
export type FetchOwnerAssetsFailureAction = ReturnType<typeof fetchOwnerAssetsFailure>