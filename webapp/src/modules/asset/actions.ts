import { action } from 'typesafe-actions'
import {
  Asset,
  AssetsFetchOptions,

} from './types'

// Fetch NFTs

export const FETCH_ASSETS_REQUEST = '[Request] Fetch assets'
export const FETCH_ASSETS_SUCCESS = '[Success] Fetch assets'
export const FETCH_ASSETS_FAILURE = '[Failure] Fetch assets'



export const fetchAssetsRequest = (options: AssetsFetchOptions) =>
  action(FETCH_ASSETS_REQUEST, {
    options: options,
    timestamp: Date.now()
  })

export const fetchAssetsSuccess = (
  options: AssetsFetchOptions,
  assets: Asset[],
  count: number,
  timestamp: number
) =>
  action(FETCH_ASSETS_SUCCESS, {
    options,
    assets,
    count,
    timestamp
  })
export const fetchAssetsFailure = (
  options: AssetsFetchOptions,
  error: string,
  timestamp: number
) => action(FETCH_ASSETS_FAILURE, {
  options,
  error, timestamp
})

export type FetchAssetsRequestAction = ReturnType<typeof fetchAssetsRequest>
export type FetchAssetsSuccessAction = ReturnType<typeof fetchAssetsSuccess>
export type FetchAssetsFailureAction = ReturnType<typeof fetchAssetsFailure>

// Fetch Asset

export const FETCH_ASSET_REQUEST = '[Request] Fetch Asset'
export const FETCH_ASSET_SUCCESS = '[Success] Fetch Asset'
export const FETCH_ASSET_FAILURE = '[Failure] Fetch Asset'

export const fetchAssetRequest = (optionId: string) =>
  action(FETCH_ASSET_REQUEST, { optionId })
export const fetchAssetSuccess = (asset: Asset) =>
  action(FETCH_ASSET_SUCCESS, { asset })
export const fetchAssetFailure = (

  optionId: string,
  error: string
) => action(FETCH_ASSET_FAILURE, { optionId, error })

export type FetchAssetRequestAction = ReturnType<typeof fetchAssetRequest>
export type FetchAssetSuccessAction = ReturnType<typeof fetchAssetSuccess>
export type FetchAssetFailureAction = ReturnType<typeof fetchAssetFailure>


