import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'
import { Card, Mana } from 'decentraland-ui'

import { formatMANA } from '../../lib/mana'
// import { formatDistanceToNow } from '../../lib/date'
import { locations } from '../../modules/routing/locations'
import { getNFTName } from '../../modules/nft/utils'
import { NFT } from '../../modules/nft/types'
import { Vendors } from '../../modules/vendor/types'
import { NFTThumbnail } from '../NFTThumbnail'
import { ParcelTags } from './ParcelTags'
import { EstateTags } from './EstateTags'
// import { WearableTags } from './WearableTags'
import { BuildingTags } from './BuildingTags'
import { TowerTags } from './TowerTags'
import { TrapTags } from './TrapTags'
import { ENSTags } from './ENSTags'
import { SMTTags } from './SMTTags'
import { LandTags } from './LandTags'
import { Props } from './NFTCard.types'
import './NFTCard.css'

const NFTCard = (props: Props) => {
  const { nft, order } = props

  const title = getNFTName(nft)
  const { parcel, estate, ens, boardingpass,
    land,
    building,
    tower,
    trap
  } = (nft as NFT<
    Vendors.DECENTRALAND
  >).data
  return (
    <Card
      className="NFTCard"
      link
      as={Link}
      to={locations.nft(nft.contractAddress, nft.tokenId)}
    >
      <NFTThumbnail nft={nft} showMonospace />
      <Card.Content>
        <Card.Header>
          <div className="title">{title}</div>{' '}
          {order ? <Mana network={order.network} inline>{formatMANA(order.price)}</Mana> : null}
        </Card.Header>
        <Card.Meta>
          {t(`networks.${nft.network?.toLowerCase()}`)}
        </Card.Meta>
        {parcel ? <ParcelTags nft={nft} /> : null}
        {estate ? <EstateTags nft={nft} /> : null}
        {/* {wearable ? <WearableTags nft={nft} /> : null} */}
        {ens ? <ENSTags nft={nft} /> : null}
        {boardingpass ? <SMTTags
        // nft={nft} 
        /> : null}
        {land ? <LandTags
        //  nft={nft} 
        /> : null}
        {building ? <BuildingTags nft={nft} /> : null}
        {tower ? <TowerTags nft={nft} /> : null}
        {trap ? <TrapTags nft={nft} /> : null}


      </Card.Content>
    </Card>
  )
}

export default React.memo(NFTCard)
