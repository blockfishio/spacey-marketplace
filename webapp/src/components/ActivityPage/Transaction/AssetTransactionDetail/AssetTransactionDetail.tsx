import React from 'react'
import { Link } from 'react-router-dom'
import { Loader, Mana, Icon } from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import {
  isPending,
  getTransactionHref
} from 'spacey-dapps/dist/modules/transaction/utils'
import {
  TransactionStatus,
  Transaction
} from 'spacey-dapps/dist/modules/transaction/types'
import { formatDistanceToNow } from '../../../../lib/date'
import { locations } from '../../../../modules/routing/locations'
// import { NFTImage } from '../../../NFTImage'
import { AssetImage } from '../../../AssetImage'
import { Row } from '../../../Layout/Row'
import { Column } from '../../../Layout/Column'
import { Props } from './AssetTransactionDetail.types'
import './AssetTransactionDetail.css'

const getHref = (tx: Transaction) => {
  if (tx.status === null) {
    return
  }
  return getTransactionHref({ txHash: tx.replacedBy || tx.hash })
}

const AssetTransactionDetail = (props: Props) => {
  const { asset, text, tx } = props
  return (
    <Row className="TransactionDetail">
      <Column align="left" grow={true}>
        <div className="image">
          {asset === null ? (
            <Loader active size="small" />
          ) : asset ? (
            <Link to={locations.asset(asset.OptionID)}>
              <AssetImage image={asset.ImageURL} isSmall />
            </Link>
          ) : (
            <Mana />
          )}
        </div>
        <div className="text">
          <div className="description">{text}</div>
          <div className="timestamp">{formatDistanceToNow(tx.timestamp)}.</div>
        </div>
      </Column>
      <Column align="right">
        <a
          href={getHref(tx)}
          className={tx.status ? 'status ' + tx.status : 'status'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="description">{tx.status || t('global.loading')}</div>
          {isPending(tx.status) ? (
            <div className="spinner">
              <Loader active size="mini" />
            </div>
          ) : null}
          {tx.status === TransactionStatus.REVERTED ? (
            <Icon name="warning sign" />
          ) : null}
          {tx.status === TransactionStatus.CONFIRMED ||
            tx.status === TransactionStatus.REPLACED ? (
            <Icon name="check" />
          ) : null}
        </a>
      </Column>
    </Row>
  )
}

export default React.memo(AssetTransactionDetail)
