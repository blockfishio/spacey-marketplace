import React, { useState, useCallback } from 'react'
// import { Network } from '@dcl/schemas'
// import { fromWei } from 'web3x-es/utils'
import { Header, Form, Field, Button, Mana } from 'decentraland-ui'
import { fromMANA } from '../../../lib/mana'

import { T, t } from 'decentraland-dapps/dist/modules/translation/utils'
import { locations } from '../../../modules/routing/locations'

import { contractAddressesAll } from '../../../modules/contract/utils'
import { ClaimAction } from '../../ClaimAction'


import { Props } from './ClaimModal.types'

const BuyPage = (props: Props) => {
  const {

    isLoading,
    onNavigate,
    wallet,
    onClaimMetamars
  } = props

  // const [
  //   computedPrice,
  //   percentageIncrease,
  //   isAboveMaxPercentage
  // ] = useComputedPrice(nft, order)
  const [quantity, setQuantity] = useState(0)
  const notEnoughMana = () => {

    // return false
    return wallet.claimable < quantity

  }

  const handleClaimMetamars = useCallback(() => {
    onClaimMetamars(quantity)
  }, [quantity, onClaimMetamars])

  const contractAddresses = contractAddressesAll[wallet.chainId]
  const claimAddress = contractAddresses.ClaimMetamars



  const handleSubmit = useCallback(() => {

    handleClaimMetamars()

  }, [
    claimAddress,
    handleClaimMetamars,
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
        id={'claim_page.not_enough_spay'}
        values={{ name, amount: <Price price={quantity.toString()} /> }}
      />
    )
  } else {
    subtitle = (
      <T
        id={'claim_page.subtitle'}
        values={{

          amount: quantity.toString()
        }}
      />
    )
  }
  return (
    <ClaimAction>
      <Header size="large">
        {t('claim_page.title')}
      </Header>
      <div className={isDisabled ? 'error' : ''}>{subtitle}</div>

      <Form onSubmit={handleSubmit}>
        <div className="form-fields">
          <Field
            label={t('claim_page.amount')}
            type="text"
            placeholder={1}
            value={quantity}
            onChange={(_event, props) => {
              const newQuantity = fromMANA(props.value)
              setQuantity(newQuantity)
            }}
          />
          <Field
            label={t('claim_page.claimable')}
            type="text"
            placeholder={1}
            value={wallet.claimable}

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
            {t('claim_page.claim')}
          </Button>

        </div>
      </Form>
    </ClaimAction>



  )
}

export default React.memo(BuyPage)
