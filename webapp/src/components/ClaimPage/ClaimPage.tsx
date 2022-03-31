import React from 'react'
// import { Network } from '@spacey2025/schemas'
// import { fromWei } from 'web3x-es/utils'
import { Page } from 'spacey-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
// import { isOwnedBy } from '../../modules/nft/utils'
import { ClaimModal } from './ClaimModal'
import { Props } from './ClaimPage.types'
import './ClaimPage.css'

const BuyPage = (props: Props) => {
  const { isLoading, onNavigate, onClaimMetamars, claimable } = props

  return (
    <>
      <Navbar isFullscreen />
      <Page className="BuyPage">

        <ClaimModal
          claimable={claimable}


          isLoading={isLoading}
          onNavigate={onNavigate}
          onClaimMetamars={onClaimMetamars}

        />
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(BuyPage)
