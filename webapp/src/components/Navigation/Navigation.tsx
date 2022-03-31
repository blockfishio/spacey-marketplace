import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Responsive } from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import { locations } from '../../modules/routing/locations'
import { Props, NavigationTab } from './Navigation.types'

const Navigation = (props: Props) => {
  const { activeTab, isFullscreen } = props
  return (
    <Tabs isFullscreen={isFullscreen}>
      <Tabs.Left>

        <Link to={locations.offical()}>
          <Tabs.Tab
            active={
              activeTab === NavigationTab.OFFICAL
            }
          >
            {t('navigation.offical'
            )}
          </Tabs.Tab>
        </Link>


        <Link to={locations.community()}>
          <Tabs.Tab active={activeTab === NavigationTab.COMMUNITY}>
            {t('navigation.community')}
          </Tabs.Tab>
        </Link>

        <Link to={locations.currentAccount()}>
          <Tabs.Tab active={activeTab === NavigationTab.MY_ASSETS}>
            {t('navigation.my_assets')}
          </Tabs.Tab>
        </Link>
        {/* <Link to={locations.bids()}>
          <Tabs.Tab active={activeTab === NavigationTab.MY_BIDS}>
            {t('navigation.my_bids')}
          </Tabs.Tab>
        </Link> */}
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Link to={locations.activity()}>
            <Tabs.Tab active={activeTab === NavigationTab.ACTIVITY}>
              {t('navigation.activity')}
            </Tabs.Tab>
          </Link>
        </Responsive>
      </Tabs.Left>
    </Tabs>
  )
}

export default React.memo(Navigation)
