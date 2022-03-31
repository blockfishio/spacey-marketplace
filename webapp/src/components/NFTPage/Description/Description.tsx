import React from 'react'
import { Header } from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import { Props } from './Description.types'
import './Description.css'

const Description = (props: Props) => {
  return props.text ? (
    <div className="Description">
      <Header sub>{t('nft_page.description')}</Header>
      <div className="description-text">{props.text}</div>
    </div>
  ) : null
}

export default React.memo(Description)
