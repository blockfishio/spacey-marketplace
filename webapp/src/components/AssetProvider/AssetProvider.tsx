import React, { useEffect } from 'react'
import { Props } from './AssetProvider.types'
import './AssetProvider.css'

const AssetProvider = (props: Props) => {
  const {
    // nft,
    // order,
    asset,
    isLoading,
    children,
    onFetchAsset,
    // contractAddress,
    optionId
  } = props

  useEffect(() => {
    // if (!nft && contractAddress && tokenId) {
    //   onFetchNFT(contractAddress, tokenId)
    // }
    if (!asset && optionId) {
      onFetchAsset(optionId)
    }
  }, [asset, optionId, onFetchAsset])

  return <>{children(asset, isLoading)}</>
}

export default React.memo(AssetProvider)
