import React from 'react'
import { Page } from 'spacey-ui'

// import { Vendors } from '../../modules/vendor/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { AssetProviderPage } from '../AssetProviderPage'
// import { ChestDetail } from './ChestDetail'
import { ChestDetail } from './ChestDetail'

// import { Asset } from '../../modules/asset/types'
import './AssetPage.css'

const VirtualPage = () => {
  return (
    <>
      <Navbar isFullscreen />
      <Navigation isFullscreen />
      <Page className="NFTPage" isFullscreen>

        <AssetProviderPage>
          {asset => {
            // TODO: Move this to components/vendor
            return (
              <>
                <ChestDetail
                  asset={asset}
                />

              </>
            )
          }}
        </AssetProviderPage>

      </Page>
      <Footer />
    </>
  )
}

export default React.memo(VirtualPage)
