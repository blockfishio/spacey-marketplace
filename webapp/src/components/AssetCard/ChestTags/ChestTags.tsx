import React from 'react'
// import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './ChestTags.types'
import './ChestTags.css'

const SMTTags = (_: Props) => {
  return (
    <div className="ChestTags tags">
      <div className="no">Ver.{_.asset.OptionID}</div>
    </div>
  )
}

export default SMTTags
