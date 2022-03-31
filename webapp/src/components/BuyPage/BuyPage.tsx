import React from 'react'
// import { Network } from '@spacey2025/schemas'
import { fromWei } from 'web3x-es/utils'
import { Page } from 'spacey-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet } from '../Wallet'
import { NFTProviderPage } from '../NFTProviderPage'
import { isOwnedBy } from '../../modules/nft/utils'
import { BuyModal } from './BuyModal'
import { Props } from './BuyPage.types'
import './BuyPage.css'

const BuyPage = (props: Props) => {
  const { authorizations, isLoading, onNavigate, onExecuteOrder } = props

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <Wallet>
          {wallet => (
            <NFTProviderPage>
              {(nft, order) => (
                <BuyModal
                  wallet={wallet}
                  nft={nft}
                  order={order}
                  authorizations={authorizations}
                  isLoading={isLoading}
                  onNavigate={onNavigate}
                  onExecuteOrder={onExecuteOrder}
                  isOwner={isOwnedBy(nft, wallet)}
                  notEnoughMana={
                    !!order &&
                    wallet.networks[wallet.network].mana <
                    +fromWei(order.price, 'ether')
                  }
                />
              )}
            </NFTProviderPage>
          )}
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
