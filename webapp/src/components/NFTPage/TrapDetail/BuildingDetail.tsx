import React, {
  // useCallback 
} from 'react'
import {
  Container, Header,
  Popup
} from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
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

// import { Highlight } from '../Highlight'
// import { Highlights } from '../Highlights'
import { Bids } from '../Bids'
import { TransactionHistory } from '../TransactionHistory'
import { Props } from './BuildingDetail.types'
import './BoardingpassDetail.css'

const WearableDetail = (props: Props) => {
  const { nft,
    // onNavigate 
  } = props
  const building = nft.data.trap!

  // const handleCategoryClick = useCallback(() => {
  //   const category = wearable.category
  //   const section = getSearchWearableSection(category)
  //   if (!section) {
  //     throw new Error(`Invalid wearable category ${category}`)
  //   }
  //   onNavigate(locations.browse({ section }))
  // }, [wearable, onNavigate])

  // const handleGenderClick = useCallback(() => {
  //   onNavigate(
  //     locations.browse({
  //       section: Section.WEARABLES,
  //       wearableGenders: isGender(wearable, BodyShape.MALE)
  //         ? [WearableGender.MALE]
  //         : [WearableGender.FEMALE]
  //     })
  //   )
  // }, [wearable, onNavigate])

  // const handleRarityClick = useCallback(() => {
  //   onNavigate(
  //     locations.browse({
  //       section: Section.WEARABLES,
  //       wearableRarities: [wearable.rarity]
  //     })
  //   )
  // }, [wearable, onNavigate])

  // const handleUnisexClick = useCallback(() => {
  //   onNavigate(
  //     locations.browse({
  //       section: Section.WEARABLES,
  //       wearableGenders: [WearableGender.MALE, WearableGender.FEMALE]
  //     })
  //   )
  // }, [onNavigate])
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
