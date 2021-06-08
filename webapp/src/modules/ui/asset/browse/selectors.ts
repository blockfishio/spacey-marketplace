import { createSelector } from 'reselect'
import { AssetState } from '../../../asset/reducer'
import { Asset } from '../../../asset/types'
import { getData as getAssetData } from '../../../asset/selectors'
import { RootState } from '../../../reducer'
import { BrowseUIState } from './reducer'

export const getState = (state: RootState) => state.ui.asset.browse
export const getView = (state: RootState) => getState(state).view
export const getCount = (state: RootState) => getState(state).count

export const getAssets = createSelector<
  RootState,
  BrowseUIState,
  AssetState['data'],
  Asset[]
>(getState, getAssetData, (browse, assetsById) =>
  browse.ids.map(id => assetsById[id])
)
