import React, {
  // useState 
} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { locations } from '../../../modules/routing/locations'
// import { VendorFactory } from '../../../modules/vendor'
import { Props } from './Actions.types'

const Actions = (props: Props) => {
  const { asset } = props
  const { OptionID } = asset






  return (
    <>


      <Button
        as={Link}
        to={locations.buyasset(OptionID)}
        primary
      >
        {t('nft_page.buy')}
      </Button>







    </>
  )
}

export default React.memo(Actions)
