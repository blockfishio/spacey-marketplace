import { createSelector } from 'reselect'
import { LoadingState } from 'decentraland-dapps/dist/modules/loading/reducer'

import { AssetState } from '../../../asset/reducer'
import { FETCH_ASSETS_REQUEST } from '../../../asset/actions'
import { Asset } from '../../../asset/types'
import {
  getData as getAssetData,
  getLoading as getAssetLoading
} from '../../../asset/selectors'
import { RootState } from '../../../reducer'
import { HomepageView } from './types'
import { HomepageUIState } from './reducer'

export const getState = (state: RootState) => state.ui.asset.homepage

export const getHomepage = createSelector<
  RootState,
  HomepageUIState,
  AssetState['data'],
  Record<HomepageView, Asset[]>
>(getState, getAssetData, (homepage, assetsById) => {
  const result: Record<string, Asset[]> = {}
  let view: HomepageView
  for (view in homepage) {
    result[view] = homepage[view].map(id => assetsById[id])
  }

  return result as Record<HomepageView, Asset[]>
})

export const getHomepageLoading = createSelector<
  RootState,
  HomepageUIState,
  LoadingState,
  Record<HomepageView, boolean>
>(getState, getAssetLoading, (homepage, assetLoading) => {
  const result: Record<string, boolean> = {}

  for (const view in homepage) {
    result[view] = assetLoading.some(
      action =>
        action.type === FETCH_ASSETS_REQUEST

      // &&
      // action.payload.options.view === view

    )
  }

  return result as Record<HomepageView, boolean>
})
