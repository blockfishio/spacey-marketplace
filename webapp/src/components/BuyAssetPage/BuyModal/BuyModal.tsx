import React, { useState, useCallback } from 'react'
// import { Network } from '@dcl/schemas'
import { fromWei } from 'web3x-es/utils'
import { Header, Form, Field, Button, Mana } from 'decentraland-ui'
import { fromMANA } from '../../../lib/mana'

import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import { locations } from '../../../modules/routing/locations'
import { getAssetName } from '../../../modules/asset/utils'
import { hasAuthorization } from '../../../modules/authorization/utils'
import { contractAddressesAll } from '../../../modules/contract/utils'
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
    wallet
  } = props

  // const [
  //   computedPrice,
  //   percentageIncrease,
  //   isAboveMaxPercentage
  // ] = useComputedPrice(nft, order)
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const notEnoughMana = () => {
    return false
    // return wallet.networks[Network.ETHEREUM].mana < +fromWei(asset.Price, 'ether') * quantity
  }

  const handleExecuteOrder = useCallback(() => {
    onExecuteOrder(asset, quantity)
  }, [asset, quantity, onExecuteOrder])

  const contractAddresses = contractAddressesAll[wallet.chainId]
  const assetsaleAddress = contractAddresses.AssetSale



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
    false
  // notEnoughMana()
  const name = <b>{getAssetName(asset)}</b>
  const Price = (props: { price: string }) => (
    <Mana inline>{props.price}</Mana>
  )

  let subtitle = null

  if (notEnoughMana()) {
    subtitle = (
      <T
        id={'buy_page.not_enough_spay'}
        values={{ name, amount: <Price price={(+fromWei(asset.Price, 'ether') * quantity).toString()} /> }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'buy_page.subtitle'}
        values={{
          name: quantity.toString() + ' ' + getAssetName(asset),
          amount: <Price price={(+fromWei(asset.Price, 'ether') * quantity).toString()} />
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

      <Form onSubmit={handleSubmit}>
        <div className="form-fields">
          <Field
            label={t('buy_page.quantity')}
            type="text"
            placeholder={1}
            value={quantity}
            onChange={(_event, props) => {
              const newQuantity = fromMANA(props.value)
              setQuantity(newQuantity)
            }}
          />
          <Field
            label={t('buy_page.price')}
            type="text"
            value={+fromWei(asset.Price, "ether") * quantity}
          />
        </div>
        <div className="buttons">
          <Button
            onClick={() =>
              onNavigate(locations.asset(asset.OptionID))
            }
          >
            {t('global.cancel')}
          </Button>

          <Button
            primary
            disabled={isDisabled || isLoading}
            type="submit"
            loading={isLoading}
          >
            {t('buy_page.buy')}
          </Button>

        </div>
      </Form>


      <AuthorizationModal
        wallet={wallet}
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
