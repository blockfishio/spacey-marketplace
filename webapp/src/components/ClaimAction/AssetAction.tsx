import React from 'react'
import { Link } from 'react-router-dom'

import { locations } from '../../modules/routing/locations'
// import { AssetImage } from '../AssetImage'
import { Row } from '../Layout/Row'
import { Column } from '../Layout/Column'
import { Props } from './AssetAction.types'
import './AssetAction.css'

const AssetAction = (props: Props) => {
  const { children } = props
  return (
    <div className="NFTAction">
      <Link to={locations.settings()}>
        <div className="back" />
      </Link>
      <Row>
        <Column align="left">
          {/* <div className="nft-image-wrapper">
            <AssetImage image={asset.ImageURL} zoom={1} />
          </div> */}
        </Column>
        <Column align="right">{children}</Column>
      </Row>
    </div>
  )
}

export default React.memo(AssetAction)
