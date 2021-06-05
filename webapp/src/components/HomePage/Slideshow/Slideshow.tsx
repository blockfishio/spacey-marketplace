import React from 'react'
import { HeaderMenu, Header, Button, Loader } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { NFTCard } from '../../NFTCard'
// import { VirtualCard } from '../../VirtualCard'
import { Props } from './Slideshow.types'
import './Slideshow.css'
import { VirtualCard } from '../../VirtualCard'

const Slideshow = (props: Props) => {
  const { title, nfts, isSubHeader, isLoading, assets, onViewAll } = props

  const renderNfts = () =>
    nfts.map((nft, index) => <NFTCard key={index} nft={nft} />)
  // const isOffial = title === t('home_page.offical')
  const renderAssets = () =>
    assets.map((asset, index) => <VirtualCard key={index} asset={asset} />)

  return (
    <div className="Slideshow">
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header sub={isSubHeader}>{title}</Header>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Button basic onClick={onViewAll}>
            {t('slideshow.view_all')}
            <i className="caret" />
          </Button>
        </HeaderMenu.Right>
      </HeaderMenu>
      <div className="nfts">
        {/* {
          isOffial ? <VirtualCard key="pack" type="pack" price="20000000000000000000" /> : null
        } */}
        {isLoading ? (
          nfts.length === 0 || assets.length === 0 ? (
            <Loader active size="massive" />
          ) : (<>
            {renderNfts()}
            {renderAssets()} </>
          )
        ) : nfts.length > 0 || assets.length > 0 ? (
          <>
            {renderNfts()}
            {renderAssets()}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default React.memo(Slideshow)
