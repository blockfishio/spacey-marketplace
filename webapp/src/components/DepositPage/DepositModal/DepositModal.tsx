import React, { useState, useCallback } from 'react'
// import { Network } from '@spacey2025/schemas'
// import { fromWei } from 'web3x-es/utils'
import { Header, Form, Field, Button, Mana } from 'spacey-ui'
import { fromMANA } from '../../../lib/mana'

import { T, t } from 'spacey-dapps/dist/modules/translation/utils'
import { locations } from '../../../modules/routing/locations'

import { contractAddressesAll } from '../../../modules/contract/utils'
import { ClaimAction } from '../../ClaimAction'


import { Props } from './DepositModal.types'
import { AuthorizationModal } from '../../AuthorizationModal'
import { AuthorizationType } from '../../AuthorizationModal/AuthorizationModal.types'
import { hasAuthorization } from '../../../modules/authorization/utils'

const BuyPage = (props: Props) => {
  const {

    isLoading,
    authorizations,

    onNavigate,
    wallet,
    onDepositGMars
  } = props

  // const [
  //   computedPrice,
  //   percentageIncrease,
  //   isAboveMaxPercentage
  // ] = useComputedPrice(nft, order)
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false)

  const [quantity, setQuantity] = useState(0)
  const notEnoughMana = () => {

    return false
    // return wallet.networks[wallet.network].metamars < quantity

  }

  const handleDepositGMars = useCallback(() => {
    onDepositGMars(quantity)
  }, [quantity, onDepositGMars])

  const contractAddresses = contractAddressesAll[wallet.chainId]
  const depositAddress = contractAddresses.DepositGMars



  const handleSubmit = useCallback(() => {
    if (
      hasAuthorization(
        authorizations,
        depositAddress,
        contractAddresses.METAMARSToken,
        AuthorizationType.ALLOWANCE
      )
    ) {
      handleDepositGMars()
    } else {
      setShowAuthorizationModal(true)
    }


  }, [
    depositAddress,
    authorizations,
    handleDepositGMars,
    setShowAuthorizationModal
  ])

  const handleClose = useCallback(() => setShowAuthorizationModal(false), [
    setShowAuthorizationModal
  ])

  const isDisabled =
    notEnoughMana()
  const name = <b>name</b>
  const Price = (props: { price: string }) => (
    <Mana network={wallet.network} inline>{props.price}</Mana>
  )

  let subtitle = null

  if (notEnoughMana()) {

    subtitle = (
      <T
        id={'deposit_page.not_enough_metamars'}
        values={{ name, amount: <Price price={quantity.toString()} /> }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'deposit_page.subtitle'}
        values={{

          amount: quantity.toString()
        }}
      />
    )
  }
  return (
    <ClaimAction>
      <Header size="large">
        {t('deposit_page.title')}
      </Header>
      <div className={isDisabled ? 'error' : ''}>{subtitle}</div>

      <Form onSubmit={handleSubmit}>
        <div className="form-fields">
          <Field
            label={t('deposit_page.amount')}
            type="text"
            placeholder={1}
            value={quantity}
            onChange={(_event, props) => {
              const newQuantity = fromMANA(props.value)
              setQuantity(newQuantity)
            }}
          />
          <Field
            label={t('deposit_page.balance')}
            type="text"
            placeholder={1}
            // value={wallet.networks[wallet.network].metamars}
            value={0}

          />

        </div>
        <div className="buttons">
          <Button
            onClick={() =>
              onNavigate(locations.settings())
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
            {t('deposit_page.deposit')}
          </Button>

        </div>
      </Form>
      <AuthorizationModal
        wallet={wallet}
        open={showAuthorizationModal}
        contractAddress={depositAddress}
        tokenAddress={contractAddresses.METAMARSToken}
        type={AuthorizationType.ALLOWANCE}
        onProceed={handleDepositGMars}
        onCancel={handleClose}
      />
    </ClaimAction>



  )
}

export default React.memo(BuyPage)
