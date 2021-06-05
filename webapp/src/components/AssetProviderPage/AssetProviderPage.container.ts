import { connect } from 'react-redux'

import { RootState } from '../../modules/reducer'
import { isConnecting } from '../../modules/wallet/selectors'
import {
  MapStateProps,
  MapDispatch,
  MapDispatchProps
} from './AssetProviderPage.types'
import AssetProviderPage from './AssetProviderPage'

const mapState = (state: RootState): MapStateProps => ({
  isConnecting: isConnecting(state)
})

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(AssetProviderPage)
