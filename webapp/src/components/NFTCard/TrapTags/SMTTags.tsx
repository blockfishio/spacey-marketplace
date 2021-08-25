import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { RARITY_COLOR } from '../../../modules/nft/common/type'

import { Props } from './SMTTags.types'
import './SMTTags.css'
import { DecentralandNFT } from '../../../modules/nft/types'

const SMTTags = (
  props: Props
) => {
  const { nft } = props
  const trap = (nft.data as DecentralandNFT).trap!
  return (
    <div className="TrapTags tags">
      <div
        className="rarity"
        style={{ backgroundColor: RARITY_COLOR[trap.rarity] }}
      >
        {t(`wearable.rarity.${trap.rarity}`)}
      </div>

    </div>
  )
}

export default SMTTags
