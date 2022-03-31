import React from 'react'
import { Header } from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'

// import { Row } from '../../Layout/Row'
import './Components.css'
import { Row } from '../../Layout/Row'

const Components = (props: { children: React.ReactNode }) => {
  return (
    <div className="Components">
      <Header sub>{t('components.title')}</Header>
      <Row>{props.children}</Row>
    </div>
  )
}

export default React.memo(Components)
