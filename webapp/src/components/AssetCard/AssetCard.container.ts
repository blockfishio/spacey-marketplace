import { connect } from 'react-redux'
// import { RootState } from '../../modules/reducer'
import { MapStateProps, MapDispatchProps } from './AssetCard.types'
import AssetCard from './AssetCard'

const mapState = (): MapStateProps => {
  return {}
}

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(AssetCard)
