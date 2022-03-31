import React from 'react'
// import { Network } from '@spacey2025/schemas'
// import { fromWei } from 'web3x-es/utils'
import { Page } from 'spacey-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet } from '../Wallet'
// import { isOwnedBy } from '../../modules/nft/utils'
import { DepositModal } from './DepositModal'
import { Props } from './DepositPage.types'
import './DepositPage.css'

const BuyPage = (props: Props) => {
  const { isLoading, onNavigate, onDepositGMars, authorizations } = props

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <Wallet>
          {wallet => (

            <DepositModal
              wallet={wallet}

              authorizations={authorizations}
              isLoading={isLoading}
              onNavigate={onNavigate}
              onDepositGMars={onDepositGMars}

            />
          )}
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
