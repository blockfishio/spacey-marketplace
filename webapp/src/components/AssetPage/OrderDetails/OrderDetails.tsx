import React from 'react'
import { Stats, Mana } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { formatMANA } from '../../../lib/mana'
import { Props } from './OrderDetails.types'

const OrderDetails = (props: Props) => {
  const { asset, wallet } = props
  return (
    <>

      <Stats title={t('nft_page.price')}>
        <Mana network={wallet.network}>{formatMANA(asset.Price)}</Mana>

      </Stats>


    </>
  )
}

export default React.memo(OrderDetails)
