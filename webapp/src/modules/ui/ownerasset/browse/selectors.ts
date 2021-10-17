import { createSelector } from 'reselect'
import { OwnerAssetState } from '../../../ownerasset/reducer'
import { OwnerAsset, OwnerChest } from '../../../ownerasset/types'
import { getData as getOwnerAssetData } from '../../../ownerasset/selectors'
import { RootState } from '../../../reducer'
import { BrowseUIState } from './reducer'
import { View } from '../../types'

export const getState = (state: RootState) => state.ui.ownerasset.browse
export const getView = (state: RootState) => getState(state).view
export const getCount = (state: RootState) => {
  if (getState(state).view == View.ACCOUNT) {
    return getState(state).count
  }
  else {
    return 0
  }
}

export const getOwnerAssets = createSelector<
  RootState,
  BrowseUIState,
  OwnerAssetState['data'],
  OwnerAsset[] | OwnerChest[]
>(getState, getOwnerAssetData, (browse, assetsById) => {
  if ((browse.view == View.ACCOUNT)) {
    return browse.ids.map(id => assetsById[id])
  }
  else {
    return []
  }
})






