import React, { useEffect } from 'react'
import {
  Container, Header,
  Popup
} from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import {
  CommonRarity,
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

// import { Status } from '../Status'

import { Bids } from '../Bids'
import { TransactionHistory } from '../TransactionHistory'
import { Props } from './BuildingDetail.types'
import './BoardingpassDetail.css'

import { Components } from '../Components'
import { Component } from '../Component'

const WearableDetail = (props: Props) => {
  const { nft,
    onFetchTowerDetail
    // onNavigate 
  } = props


  useEffect(() => {
    // if (!nft && contractAddress && tokenId) {
    //   onFetchNFT(contractAddress, tokenId)
    // }
    if (!nft.detail) {
      onFetchTowerDetail(nft)
    }
  }, [nft, onFetchTowerDetail])

  const building = nft.data.tower!

  return (
    <div className="TowerDetail">
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
        {/* <Row>
          <Status /> </Row> */}
        <Components >

          <Component
            icon={<div className={"barrel " + CommonRarity[nft.detail ? nft.detail.P1.Rarity : 1]} />}
            name={"Barrel"}
          />
          <Component
            icon={<div className={"enhancer " + CommonRarity[nft.detail ? nft.detail.P2.Rarity : 1]} />}
            name={"Enhancer"}
          />

          <Component
            icon={<div className={"controller " + CommonRarity[nft.detail ? nft.detail.P3.Rarity : 1]} />}
            name={"Controller"}
          />
          <Component
            icon={<div className={"base " + CommonRarity[nft.detail ? nft.detail.P4.Rarity : 1]} />}
            name={"Base"}
          />




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
