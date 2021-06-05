import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../modules/reducer'
import { renameNFTRequest } from '../../modules/nft/actions'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch
} from './RenamePage.types'
import RenamePage from './RenamePage'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path)),
  onRename: (nft, ownername) => dispatch(renameNFTRequest(nft, ownername))
})

export default connect(mapState, mapDispatch)(RenamePage)
