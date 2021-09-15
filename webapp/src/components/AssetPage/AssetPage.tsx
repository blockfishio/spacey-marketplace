import React from 'react'
import { Page } from 'decentraland-ui'

// import { Vendors } from '../../modules/vendor/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Navigation } from '../Navigation'
import { AssetProviderPage } from '../AssetProviderPage'
// import { ChestDetail } from './ChestDetail'
import { ChestDetail } from './ChestDetail'
import { Wallet } from '../Wallet'

// import { Asset } from '../../modules/asset/types'
import './AssetPage.css'

const VirtualPage = () => {
  return (
    <>
      <Navbar isFullscreen />
      <Navigation isFullscreen />
      <Page className="NFTPage" isFullscreen>
        <Wallet>{
          wallet => (
            <AssetProviderPage>
              {asset => {
                // TODO: Move this to components/vendor
                return (
                  <>
                    <ChestDetail
                      asset={asset}
                      wallet={wallet}
                    />

                  </>
                )
              }}
            </AssetProviderPage>
          )
        }
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(VirtualPage)
