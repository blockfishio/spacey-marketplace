import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../modules/reducer'
import {
  getAuthorizations,
  isLoading
} from '../../modules/authorization/selectors'
import {
  getData as getClaimable
} from '../../modules/claim/selectors'
import { claimMetamarsRequest } from '../../modules/claim/actions'
import { MapStateProps, MapDispatchProps, MapDispatch } from './ClaimPage.types'
import BuyPage from './ClaimPage'

const mapState = (state: RootState): MapStateProps => ({
  authorizations: getAuthorizations(state),
  isLoading: isLoading(state),
  claimable: getClaimable(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onClaimMetamars: (amount) =>
    dispatch(claimMetamarsRequest(amount))
})

export default connect(mapState, mapDispatch)(BuyPage)
