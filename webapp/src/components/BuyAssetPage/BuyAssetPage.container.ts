import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../modules/reducer'
import {
  getAuthorizations,
  isLoading
} from '../../modules/authorization/selectors'
import { executeAssetOrderRequest } from '../../modules/order/actions'
import { MapStateProps, MapDispatchProps, MapDispatch } from './BuyAssetPage.types'
import BuyAssetPage from './BuyAssetPage'

const mapState = (state: RootState): MapStateProps => ({
  authorizations: getAuthorizations(state),
  isLoading: isLoading(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onExecuteOrder: (asset) =>
    dispatch(executeAssetOrderRequest(asset))
})

export default connect(mapState, mapDispatch)(BuyAssetPage)
