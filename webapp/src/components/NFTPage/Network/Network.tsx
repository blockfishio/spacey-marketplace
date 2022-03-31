import React from 'react'
import { Stats } from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'

import { Props } from './Network.types'

const Network = (props: Props) => {
  const { asset } = props

  return (
    <Stats title={t('global.network')}>
      {t(`networks.${asset.network!.toLowerCase()}`)}
    </Stats>
  )
}

export default React.memo(Network)
