import React, {
  // useCallback 
} from 'react'
import {
  Container, Header,
  Popup
} from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import {
  RARITY_COLOR,
} from '../../../modules/nft/common/type'
import { getNFTName } from '../../../modules/nft/utils'
// import { isUnisex, isGender } from '../../../modules/nft/wearable/utils'
// import { locations } from '../../../modules/routing/locations'
// import { getSearchWearableSection } from '../../../modules/routing/search'
// import { Section } from '../../../modules/vendor/decentraland/routing/types'
import { PageHeader } from '../../PageHeader'
import { NFTImage } from '../../NFTImage'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Title } from '../Title'
import { Owner } from '../Owner'
import { Description } from '../Description'
import { OrderDetails } from '../OrderDetails'
import { Actions } from '../Actions'
import { Network } from '../Network'
import { VendorFactory } from '../../../modules/vendor'

import { Status } from '../Status'
import { Highlight } from '../Highlight'
import { Components } from '../Components'
import { Bids } from '../Bids'
import { TransactionHistory } from '../TransactionHistory'
import { Props } from './BuildingDetail.types'
import './BoardingpassDetail.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { TowerStats } from '../../../modules/nft/tower/types'

const WearableDetail = (props: Props) => {
  const { nft,
    // onNavigate 
  } = props
  const building = nft.data.tower!
  const [towerStats, setTowerStats] = useState({} as readonly [TowerStats])
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    if (nft && nft.subcategory && building.rarity) {
      const { assetService } = VendorFactory.build(nft.vendor)
      if (assetService) {
        setIsLoading(true)
        Promise.all([
          assetService.fetchTowerstats(nft.subcategory + '_' + building.rarity.toString())
        ])
          .then(([towerstats]) => {
            setTowerStats(towerstats)
          })
          .finally(() => setIsLoading(false))
          .catch(error => {
            console.error(error)
          })
      }
    }
  }, [nft, setIsLoading, setTowerStats])

  console.log(towerStats)




  return (
    <div className="WearableDetail">
      <PageHeader>
        <NFTImage nft={nft} />
      </PageHeader>

      <Container>
        <Title
          left={
            <Header size="large">
              <div className="text">
                {getNFTName(nft)}
                <Popup
                  position="top center"
                  content={t(`wearable.rarity_tooltip.${building.rarity}`)}
                  trigger={
                    <div
                      className="rarity"
                      style={{
                        backgroundColor: RARITY_COLOR[building.rarity]
                      }}

                    >
                      {t(`wearable.rarity.${building.rarity}`)}
                    </div>
                  }
                />
              </div>
            </Header>
          }
          right={<Owner nft={nft} />}
        />
        <Description text={building.description} />
        {isLoading ? null :
          <Row>
            <Status towerStats={towerStats[0]} /> </Row>
        }
        <Components >
          <Row>
            <Highlight
              icon={<div className={"earring"} />}
              name={"Grants each attack a 10% chance to create an illusion of the target for 8 seconds.\nThe target will receive 120% damages of its illusion damage taken."}
            />

          </Row>
          <Row>
            <Highlight
              icon={<div className={"earring"} style={{
                backgroundColor: RARITY_COLOR[building.rarity]
              }} />}
              name={"Attack range + 100."}
            />
            <Highlight
              icon={<div className={"earring"} />}
              name={"Attack range + 100."}
            />
            <Highlight
              icon={<div className={"earring"} />}
              name={"Attack range + 100."}
            />
            <Highlight
              icon={<div className={"earring"} />}
              name={"Attack range + 100."}
            />

          </Row>
          <Row>
            <Highlight
              icon={<div className={"earring"} />}
              name={"Attack range + 100."}
            />
          </Row>
          <Row>
            <Highlight
              icon={<div className={"earring"} />}
              name={"Attack range + 100."}
            />
          </Row>


        </Components>
        <Row>
          <Column align="left" grow={true}>
            <Network asset={nft} />

            <OrderDetails nft={nft} />
          </Column>
          <Column align="right">
            <Actions nft={nft} />
          </Column>
        </Row>

        <Bids nft={nft} />
        <TransactionHistory nft={nft} />
      </Container>
    </div>
  )
}

export default React.memo(WearableDetail)
