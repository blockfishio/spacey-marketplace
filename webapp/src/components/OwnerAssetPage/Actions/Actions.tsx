import React, {
  // useState 
} from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

// import { locations } from '../../../modules/routing/locations'
// import { VendorFactory } from '../../../modules/vendor'
// import { Props } from './Actions.types'

const Actions = (
  // props: Props
) => {
  // const { asset } = props
  // const { OptionID } = asset






  return (
    <>

      <a href="https://game.spacey2025.com" target="_blank">

        <Button
          // as={Link}
          // to={"https://game.spacey2025.com"}
          primary
        >
          {t('nft_page.open')}
        </Button>
      </a>







    </>
  )
}

export default React.memo(Actions)
