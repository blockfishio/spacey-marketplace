import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card, Mana } from 'decentraland-ui'

import { formatMANA } from '../../lib/mana'
import { locations } from '../../modules/routing/locations'
import { AssetImage } from '../AssetImage'
import { Props } from './AssetCard.types'
import { ChestTags } from './ChestTags'
import './AssetCard.css'

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
      <AssetImage image={asset.ImageURL} showMonospace />
      <Card.Content>
        <Card.Header>
          <div className="title">{title}</div>{' '}
          <Mana inline>{formatMANA(asset.Price)}</Mana>
        </Card.Header>
        <Card.Meta>
          {t('nft_card.expires_at', {
            date: "in 999 days"
          })}
        </Card.Meta>
        <ChestTags asset={asset} />

      </Card.Content>
    </Card>
  )
}

export default React.memo(VirtualCard)
