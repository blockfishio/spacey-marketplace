import { action } from 'typesafe-actions'
import {
  Asset,
  AssetCount,
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


export const COUNT_ASSET_REQUEST = '[Request] Count Asset'
export const COUNT_ASSET_SUCCESS = '[Success] Count Asset'
export const COUNT_ASSET_FAILURE = '[Failure] Count Asset'

export const countAssetRequest = (optionId: string) =>
  action(COUNT_ASSET_REQUEST, { optionId })
export const countAssetSuccess = (assetcount: AssetCount) =>
  action(COUNT_ASSET_SUCCESS, { assetcount })
export const countAssetFailure = (

  optionId: string,
  error: string
) => action(COUNT_ASSET_FAILURE, { optionId, error })

export type CountAssetRequestAction = ReturnType<typeof countAssetRequest>
export type CountAssetSuccessAction = ReturnType<typeof countAssetSuccess>
export type CountAssetFailureAction = ReturnType<typeof countAssetFailure>

export const FETCH_TOWERDETAIL_REQUEST = '[Request] Fetch TowerDetail'
export const FETCH_TOWERDETAIL_SUCCESS = '[Success] Fetch TowerDetail'
export const FETCH_TOWERDETAIL_FAILURE = '[Failure] Fetch TowerDetail'


