import React from 'react'
import { Header } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

// import { Row } from '../../Layout/Row'
import './Components.css'

const Components = (props: { children: React.ReactNode }) => {
  return (
    <div className="Highlights">
      <Header sub>{t('components.title')}</Header>
      {props.children}
    </div>
  )
}

export default React.memo(Components)
