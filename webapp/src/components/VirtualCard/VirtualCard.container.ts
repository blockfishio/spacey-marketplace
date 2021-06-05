import { connect } from 'react-redux'
// import { RootState } from '../../modules/reducer'
import { MapStateProps, MapDispatchProps } from './VirtualCard.types'
import VirtualCard from './VirtualCard'

const mapState = (): MapStateProps => {
  return {}
}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(VirtualCard)
