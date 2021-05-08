import React from 'react'
// import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './SMTTags.types'
import './SMTTags.css'

const SMTTags = (_: Props) => {
  return (
    <div className="SMTTags tags">
      <div className="no">No.{_.nft.tokenId}</div>
    </div>
  )
}

export default SMTTags
