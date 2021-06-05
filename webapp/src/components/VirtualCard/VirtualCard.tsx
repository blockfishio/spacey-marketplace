import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card, Mana } from 'decentraland-ui'

import { formatMANA } from '../../lib/mana'
import { locations } from '../../modules/routing/locations'
import { VirtualImage } from '../VirtualImage'
import { Props } from './VirtualCard.types'
import './VirtualCard.css'

const VirtualCard = (props: Props) => {
  const { asset } = props

  const title = t(`virtual_card.${asset.Category}`)


  return (
    <Card
      className="NFTCard"
      link
      as={Link}
      to={locations.asset(asset.OptionID)}
    >
      <VirtualImage image={asset.ImageURL} showMonospace />
      <Card.Content>
        <Card.Header>
          <div className="title">{title}</div>{' '}
          <Mana inline>{formatMANA(asset.Price)}</Mana>
        </Card.Header>

      </Card.Content>
    </Card>
  )
}

export default React.memo(VirtualCard)
