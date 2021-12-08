import React from 'react'
import {
  // Header, 
  Stats
} from 'decentraland-ui'
// import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './Status.types'
import './Status.css'

const Status = (props: Props) => {
  const { towerStats } = props
  if (towerStats) {
    return (
      <>
        <Stats title='Attack'>
          {towerStats.Attack}
        </Stats>
        <Stats title='Attack Speed'>
          {towerStats.AttactSpeed}
        </Stats>
        <Stats title='Attack Range'>
          {towerStats.AttackRange}
        </Stats>
        <Stats title='Durability'>
          {towerStats.Durability}
        </Stats>
      </>
    )
  }
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
