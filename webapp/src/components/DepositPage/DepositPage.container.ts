import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../modules/reducer'
import {
  getAuthorizations,
  isLoading
} from '../../modules/authorization/selectors'
import { depositGMarsRequest } from '../../modules/deposit/actions'
import { MapStateProps, MapDispatchProps, MapDispatch } from './DepositPage.types'
import BuyPage from './DepositPage'

const mapState = (state: RootState): MapStateProps => ({
  authorizations: getAuthorizations(state),
  isLoading: isLoading(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onDepositGMars: (amount) =>
    dispatch(depositGMarsRequest(amount))
})

export default connect(mapState, mapDispatch)(BuyPage)
