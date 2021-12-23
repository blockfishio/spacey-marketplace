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
      to={asset.Price ? locations.asset(asset.OptionID) : locations.ownerasset(asset.OptionID)}
    >
      <AssetImage image={asset.ImageURL} showMonospace />
      <Card.Content>
        <Card.Header>
          <div className="title">{title}</div>{' '}
          {
            asset.Price ?
              <Mana inline>{formatMANA(asset.Price)}</Mana> : null
          }
        </Card.Header>
        <Card.Meta>
          {
            asset.Price ?
              // t('nft_card.expires_at', {
              //   date: "in 999 days"
              // }) 
              "On Sale"
              : null}
        </Card.Meta>
        <ChestTags asset={asset} />

      </Card.Content>
    </Card>
  )
}

export default React.memo(VirtualCard)
