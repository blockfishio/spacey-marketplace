import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../../modules/reducer'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch
} from './BuildingDetail.types'
import EstateDetail from './BuildingDetail'
import { fetchTowerDetailRequest } from '../../../modules/nft/actions'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onFetchTowerDetail: towerid => dispatch(fetchTowerDetailRequest(towerid))
})

export default connect(mapState, mapDispatch)(EstateDetail)
