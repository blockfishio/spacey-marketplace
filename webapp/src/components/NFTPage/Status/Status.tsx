import React from 'react'
import {
  // Header, 
  Stats
} from 'decentraland-ui'
// import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './Status.types'
import './Status.css'

const Status = (props: Props) => {
  return props ? (<>
    <Stats title='ATK'>
      113
    </Stats>
    <Stats title='ATR'>
      113
    </Stats>
    <Stats title='RANGE'>
      113
    </Stats>
  </>
  ) : null
}

export default React.memo(Status)
