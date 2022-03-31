import React from 'react'
import { Link } from 'react-router-dom'
import { Mana } from 'spacey-ui'
import { T, t } from 'spacey-dapps/dist/modules/translation/utils'
import { TransactionLink, Profile } from 'spacey-dapps/dist/containers'

import { contractSymbols } from '../../../modules/contract/utils'
import { getNFTName } from '../../../modules/nft/utils'
import {
  APPROVE_TOKEN_SUCCESS,
  ALLOW_TOKEN_SUCCESS
} from '../../../modules/authorization/actions'
import {
  CREATE_ORDER_SUCCESS,
  CANCEL_ORDER_SUCCESS,
  EXECUTE_ORDER_SUCCESS,
  EXECUTE_ASSETORDER_SUCCESS
} from '../../../modules/order/actions'
import { TRANSFER_NFT_SUCCESS } from '../../../modules/nft/actions'
import {
  PLACE_BID_SUCCESS,
  ACCEPT_BID_SUCCESS,
  CANCEL_BID_SUCCESS
} from '../../../modules/bid/actions'
import { locations } from '../../../modules/routing/locations'
import { NFTProvider } from '../../NFTProvider'
import { AssetProvider } from '../../AssetProvider'
import { TransactionDetail } from './TransactionDetail'
import { AssetTransactionDetail } from './AssetTransactionDetail'
import { Props } from './Transaction.types'

const Transaction = (props: Props) => {
  const { tx } = props
  switch (tx.actionType) {
    case ALLOW_TOKEN_SUCCESS: {
      const { isAllowed, contractAddress, tokenContractAddress } = tx.payload
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.approve_token"
              values={{
                action: isAllowed
                  ? t('transaction.action.approved')
                  : t('transaction.action.not_approved'),
                contract: (
                  <TransactionLink address={contractAddress} txHash="">
                    {contractSymbols[contractAddress]}
                  </TransactionLink>
                ),
                token: (
                  <TransactionLink address={tokenContractAddress} txHash="">
                    {contractSymbols[tokenContractAddress]}
                  </TransactionLink>
                )
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case APPROVE_TOKEN_SUCCESS: {
      const { isApproved, contractAddress, tokenContractAddress } = tx.payload
      return (
        <TransactionDetail
          text={
            <T
              id="transaction.detail.approve_token"
              values={{
                action: isApproved
                  ? t('transaction.action.approved')
                  : t('transaction.action.not_approved'),
                contract: (
                  <TransactionLink address={contractAddress} txHash="">
                    {contractSymbols[contractAddress]}
                  </TransactionLink>
                ),
                token: (
                  <TransactionLink address={tokenContractAddress} txHash="">
                    {contractSymbols[tokenContractAddress]}
                  </TransactionLink>
                )
              }}
            />
          }
          tx={tx}
        />
      )
    }
    case CREATE_ORDER_SUCCESS: {
      const { tokenId, contractAddress, name, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.create_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case CANCEL_ORDER_SUCCESS: {
      const { tokenId, contractAddress, name, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.cancel_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case EXECUTE_ORDER_SUCCESS: {
      const { tokenId, contractAddress, name, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.execute_order"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case EXECUTE_ASSETORDER_SUCCESS: {
      const { tokenId, name, price } = tx.payload
      return (
        <AssetProvider optionId={tokenId}>
          {asset => (
            <AssetTransactionDetail
              asset={asset}
              text={
                <T
                  id="transaction.detail.execute_assetorder"
                  values={{
                    name: (
                      <Link to={locations.asset(tokenId)}>
                        {name}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </AssetProvider>
      )
    }
    case TRANSFER_NFT_SUCCESS: {
      const { tokenId, contractAddress, name, address } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.transfer"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {name}
                      </Link>
                    ),
                    address: (
                      <Link to={locations.account(address)}>
                        <Profile address={address} />
                      </Link>
                    )
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case PLACE_BID_SUCCESS: {
      const { tokenId, contractAddress, price } = tx.payload

      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.place_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case ACCEPT_BID_SUCCESS: {
      const { tokenId, contractAddress, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.accept_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    case CANCEL_BID_SUCCESS: {
      const { tokenId, contractAddress, price } = tx.payload
      return (
        <NFTProvider contractAddress={contractAddress} tokenId={tokenId}>
          {nft => (
            <TransactionDetail
              nft={nft}
              text={
                <T
                  id="transaction.detail.cancel_bid"
                  values={{
                    name: (
                      <Link to={locations.nft(contractAddress, tokenId)}>
                        {nft ? getNFTName(nft) : ''}
                      </Link>
                    ),
                    price: <Mana inline>{price.toLocaleString()}</Mana>
                  }}
                />
              }
              tx={tx}
            />
          )}
        </NFTProvider>
      )
    }
    default:
      return null
  }
}

export default React.memo(Transaction)
