import React from 'react'
import { Network } from '@dcl/schemas'
import { fromWei } from 'web3x-es/utils'
import { Page } from 'decentraland-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet } from '../Wallet'
import { AssetProviderPage } from '../AssetProviderPage'
import { BuyModal } from './BuyModal'
import { Props } from './BuyAssetPage.types'
import './BuyAssetPage.css'

const BuyAssetPage = (props: Props) => {
  const { authorizations, isLoading, onNavigate, onExecuteOrder } = props
  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <Wallet>
          {wallet => (
            <AssetProviderPage>
              {(asset) => {

                return (
                  <BuyModal
                    asset={asset}
                    authorizations={authorizations}
                    isLoading={isLoading}
                    onNavigate={onNavigate}
                    onExecuteOrder={onExecuteOrder}
                    notEnoughMana={
                      wallet.networks[Network.ETHEREUM].mana <
                      +fromWei(asset.Price, 'ether')
                    }
                  />
                )
              }}
            </AssetProviderPage>
          )}
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyAssetPage)
