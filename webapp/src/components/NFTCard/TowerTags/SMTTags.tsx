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
  const tower = (nft.data as DecentralandNFT).tower!
  return (
    <div className="TowerTags tags">
      <div
        className="rarity"
        style={{ backgroundColor: RARITY_COLOR[tower.rarity] }}
      >
        {t(`wearable.rarity.${tower.rarity}`)}
      </div>

    </div>
  )
}

export default SMTTags
