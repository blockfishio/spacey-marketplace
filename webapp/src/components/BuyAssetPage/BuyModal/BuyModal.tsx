import React, { useState, useCallback } from 'react'
import { Header, Mana, Button } from 'decentraland-ui'
import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import { formatMANA } from '../../../lib/mana'
import { locations } from '../../../modules/routing/locations'
import { getAssetName } from '../../../modules/asset/utils'
import { hasAuthorization } from '../../../modules/authorization/utils'
import { contractAddresses } from '../../../modules/contract/utils'
// import { 
//   useFingerprint, 
//   useComputedPrice } from '../../../modules/nft/hooks'
// import { NFTCategory } from '../../../modules/nft/types'
import { AssetAction } from '../../AssetAction'
import { AuthorizationModal } from '../../AuthorizationModal'
import { AuthorizationType } from '../../AuthorizationModal/AuthorizationModal.types'
import { Props } from './BuyModal.types'

const BuyPage = (props: Props) => {
  const {
    asset,
    authorizations,
    isLoading,
    onNavigate,
    onExecuteOrder,
    notEnoughMana
  } = props

  // const [
  //   computedPrice,
  //   percentageIncrease,
  //   isAboveMaxPercentage
  // ] = useComputedPrice(nft, order)
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)
  const [wantsToProceed, setWantsToProceed] = useState(false)

  const handleExecuteOrder = useCallback(() => {
    onExecuteOrder(asset)
  }, [asset, onExecuteOrder])

  const assetsaleAddress = contractAddresses.AssetSale

  const handleToggleWantsToProceed = useCallback(() => {
    setWantsToProceed(!wantsToProceed)
  }, [wantsToProceed, setWantsToProceed])

  const handleSubmit = useCallback(() => {
    if (
      hasAuthorization(
        authorizations,
        assetsaleAddress,
        contractAddresses.MANAToken,
        AuthorizationType.ALLOWANCE
      )
    ) {
      handleExecuteOrder()
    } else {
      setShowAuthorizationModal(true)
    }
  }, [
    assetsaleAddress,
    authorizations,
    handleExecuteOrder,
    setShowAuthorizationModal
  ])

  const handleClose = useCallback(() => setShowAuthorizationModal(false), [
    setShowAuthorizationModal
  ])

  const isDisabled =

    notEnoughMana
  console.log(isDisabled)
  const name = <b>{getAssetName(asset)}</b>
  const Price = (props: { price: string }) => (
    <Mana inline>{formatMANA(props.price)}</Mana>
  )

  let subtitle = null

  if (notEnoughMana) {
    subtitle = (
      <T
        id={'buy_page.not_enough_spay'}
        values={{ name, amount: <Price price={asset.Price} /> }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'buy_page.subtitle'}
        values={{
          name,
          amount: <Price price={asset.Price} />
        }}
      />
    )
  }

  return (
    <AssetAction asset={asset}>
      <Header size="large">
        {t('buy_page.title', { category: t(`global.${asset.Category}`) })}
      </Header>
      <div className={isDisabled ? 'error' : ''}>{subtitle}</div>
      <div className="buttons">
        <Button
          onClick={() =>
            onNavigate(locations.asset(asset.OptionID))
          }
        >
          {t('global.cancel')}
        </Button>

        {isDisabled === false ? (
          <Button
            primary
            disabled={isDisabled || isLoading}
            onClick={handleSubmit}
            loading={isLoading}
          >
            {t('buy_page.buy')}
          </Button>
        ) : (
          <Button
            primary
            onClick={handleToggleWantsToProceed}
            loading={isLoading}
          >
            {t('buy_page.proceed_anyways')}
          </Button>
        )}
      </div>
      <AuthorizationModal
        open={showAuthorizationModal}
        contractAddress={assetsaleAddress}
        tokenAddress={contractAddresses.MANAToken}
        type={AuthorizationType.ALLOWANCE}
        onProceed={handleExecuteOrder}
        onCancel={handleClose}
      />
    </AssetAction>
  )
}

export default React.memo(BuyPage)
