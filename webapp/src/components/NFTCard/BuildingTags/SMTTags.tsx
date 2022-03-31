import React from 'react'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import { RARITY_COLOR } from '../../../modules/nft/common/type'

import { Props } from './SMTTags.types'
import './SMTTags.css'
import { DecentralandNFT } from '../../../modules/nft/types'

const SMTTags = (
  props: Props
) => {
  const { nft } = props
  const building = (nft.data as DecentralandNFT).building!
  return (
    <div className="BuildingTags tags">
      <div
        className="rarity"
        style={{ backgroundColor: RARITY_COLOR[building.rarity] }}
      >
        {t(`wearable.rarity.${building.rarity}`)}
      </div>

    </div>
  )
}

export default SMTTags
