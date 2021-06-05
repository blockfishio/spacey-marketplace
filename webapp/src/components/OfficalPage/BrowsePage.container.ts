import { connect } from 'react-redux'

import { RootState } from '../../modules/reducer'
import { getIsFullscreen, getVendor } from '../../modules/routing/selectors'
import { MapStateProps } from './BrowsePage.types'
import OfficalPage from './OfficalPage'

const mapState = (state: RootState): MapStateProps => ({
  vendor: getVendor(state),
  isFullscreen: getIsFullscreen(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(OfficalPage)
