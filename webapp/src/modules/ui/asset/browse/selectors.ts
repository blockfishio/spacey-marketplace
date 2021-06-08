import { createSelector } from 'reselect'
import { AssetState } from '../../../asset/reducer'
import { Asset } from '../../../asset/types'
import { getData as getAssetData } from '../../../asset/selectors'
import { RootState } from '../../../reducer'
import { BrowseUIState } from './reducer'
import { View } from '../../types'

export const getState = (state: RootState) => state.ui.asset.browse
export const getView = (state: RootState) => getState(state).view
export const getCount = (state: RootState) => {
  if (getState(state).view == View.OFFICAL) {
    return getState(state).count
  }
  else {
    return 0
  }
}

export const getAssets = createSelector<
  RootState,
  BrowseUIState,
  AssetState['data'],
  Asset[]
>(getState, getAssetData, (browse, assetsById) => {
  if ((browse.view == View.OFFICAL)) {
    return browse.ids.map(id => assetsById[id])
  }
  else {
    return []
  }
})






