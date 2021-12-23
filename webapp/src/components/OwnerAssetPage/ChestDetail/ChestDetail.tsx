import React, {
  // useCallback 
} from 'react'
import {
  Container, Header,
  //  Popup
} from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
// import {
//   RARITY_COLOR,
//   BodyShape,
//   WearableGender
// } from '../../../modules/nft/wearable/types'
// import { getNFTName } from '../../../modules/nft/utils'
// import { isUnisex, isGender } from '../../../modules/nft/wearable/utils'
// import { locations } from '../../../modules/routing/locations'
// import { getSearchWearableSection } from '../../../modules/routing/search'
// import { Section } from '../../../modules/vendor/decentraland/routing/types'
import { PageHeader } from '../../PageHeader'
// import { NFTImage } from '../../NFTImage'
import { AssetImage } from '../../AssetImage'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Title } from '../../NFTPage/Title'
// import { Owner } from '../Owner'
// import { Description } from '../Description'
// import { OrderDetails } from '../OrderDetails'
import { Actions } from '../Actions'
// import { Highlight } from '../Highlight'
// import { Highlights } from '../Highlights'
// import { Bids } from '../Bids'
// import { TransactionHistory } from '../TransactionHistory'
import { Props } from './ChestDetail.types'
import './ChestDetail.css'

const ChestDetail = (props: Props) => {
  const { asset
    // onNavigate 
  } = props
  // const wearable = nft.data.wearable!

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
        <AssetImage image={asset.ImageURL} />
      </PageHeader>
      <Container>
        <Title
          left={
            <Header size="large">
              <div className="text">
                {/* {getNFTName(nft)} */}
                {t(`virtual_card.${asset.Category}`)} Ver.{asset.OptionID}
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
          right={<>
          </>} />
        {/* <Description text="1551" /> */}
        <Row>
          <Column align="left" grow={true}>
            {/* <OrderDetails asset={asset} /> */}
          </Column>
          <Column align="right">
            <Actions
            // asset={asset} 
            />
          </Column>
        </Row>

        {/* <Bids nft={nft} /> */}
        {/* <TransactionHistory nft={nft} /> */}
      </Container>
    </div >
  )
}

export default React.memo(ChestDetail)
