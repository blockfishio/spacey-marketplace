import React, {
  // useCallback 
} from 'react'
import {
  Container, Header,
  //  Popup
} from 'spacey-ui'

import { getNFTName } from '../../../modules/nft/utils'

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
import { Bids } from '../Bids'
import { TransactionHistory } from '../TransactionHistory'
import { Props } from './LandDetail.types'
import './LandDetail.css'

const WearableDetail = (props: Props) => {
  const { nft,
    // onNavigate 
  } = props
  const land = nft.data.land!


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
                {/* <Popup
                  position="top center"
                  content={t(`wearable.rarity_tooltip.epic`)}
                  trigger={
                    <div
                      className="rarity"
                      // style={{
                      //   backgroundColor: RARITY_COLOR['epic']
                      // }}
                      onClick={handleRarityClick}
                    >
                      {t(`wearable.rarity.epic`)}
                    </div>
                  }
                /> */}
              </div>
            </Header>
          }
          right={<Owner nft={nft} />}
        />
        <Description text={land.description} />
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
