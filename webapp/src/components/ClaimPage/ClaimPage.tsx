import React from 'react'
// import { Network } from '@dcl/schemas'
// import { fromWei } from 'web3x-es/utils'
import { Page } from 'decentraland-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet } from '../Wallet'
// import { isOwnedBy } from '../../modules/nft/utils'
import { ClaimModal } from './ClaimModal'
import { Props } from './ClaimPage.types'
import './ClaimPage.css'

const BuyPage = (props: Props) => {
  const { isLoading, onNavigate, onClaimMetamars } = props

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">
        <Wallet>
          {wallet => (

            <ClaimModal
              wallet={wallet}


              isLoading={isLoading}
              onNavigate={onNavigate}
              onClaimMetamars={onClaimMetamars}

            />
          )}
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
