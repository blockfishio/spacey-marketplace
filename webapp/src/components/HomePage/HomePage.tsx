import React, {
  useCallback,
  useEffect
} from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { isMobile } from 'decentraland-dapps/dist/lib/utils'
import { Page, Hero, Button } from 'decentraland-ui'
import { locations } from '../../modules/routing/locations'
import { Vendors } from '../../modules/vendor/types'
import { SortBy } from '../../modules/routing/types'
import { View } from '../../modules/ui/types'
import { HomepageView } from '../../modules/ui/nft/homepage/types'
import { Section } from '../../modules/vendor/decentraland/routing/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Slideshow } from './Slideshow'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage = (props: Props) => {
  const { homepagenft,
    homepageLoadingnft,
    homepageAsset,
    homepageLoadingAsset,
    onNavigate,
    onFetchNFTsFromRoute,
    onFetchAssetsFromRoute } = props

  const sections = {
    // [View.HOME_WEARABLES]: Section.WEARABLES,
    // [View.HOME_LAND]: Section.LAND,
    // [View.HOME_ENS]: Section.ENS,
    // [View.HOME_BOARDINGPASS]: Section.BOARDINGPASS,
    [View.COMMUNITY]: Section.ALL,
    [View.OFFICAL]: Section.ALL
  }

  const handleGetStarted = useCallback(() => onNavigate(locations.browse()), [
    onNavigate
  ])

  const handleViewAll = useCallback(
    (section: Section) => onNavigate(locations.browse({ section })),
    [onNavigate]
  )

  const vendor = Vendors.DECENTRALAND

  useEffect(() => {
    let view: HomepageView
    for (view in homepagenft) {
      const section = sections[view]
      onFetchNFTsFromRoute({
        vendor,
        section,
        view,
        sortBy: SortBy.RECENTLY_LISTED,
        page: 1,
        onlyOnSale: true
      })
      onFetchAssetsFromRoute({
        vendor,
        view
      })
    }
    // eslint-disable-next-line
  }, [onFetchNFTsFromRoute, onFetchAssetsFromRoute])

  const views = Object.keys(homepagenft) as HomepageView[]
  return (
    <>
      <Navbar isFullscreen isOverlay />
      <Hero centered={isMobile()} className="HomePageHero">
        <Hero.Header>{t('home_page.title')}</Hero.Header>
        <Hero.Description>{t('home_page.subtitle')}</Hero.Description>
        <Hero.Content>
          <div className="hero-image" />{' '}
        </Hero.Content>
        <Hero.Actions>
          <Button primary onClick={handleGetStarted} >
            {t('home_page.get_started')}
          </Button>
        </Hero.Actions>
      </Hero>
      <Page className="HomePage">
        {views.map(view => (
          <Slideshow
            key={view}
            title={t(`home_page.${view}`)}
            nfts={homepagenft[view]}
            assets={homepageAsset[view]}
            isLoading={homepageLoadingnft[view] || homepageLoadingAsset[view]}
            onViewAll={() => handleViewAll(sections[view])}
          />
        ))}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
