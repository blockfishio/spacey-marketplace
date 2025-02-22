import React, { useCallback } from 'react'
import { Card, Button, Loader } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { getMaxQuerySize, MAX_PAGE, PAGE_SIZE } from '../../modules/vendor/api'
import { NFTCard } from '../NFTCard'
import { AssetCard } from '../AssetCard'
import { Props } from './NFTList.types'
import { AssetCategory } from '../../modules/asset/types'

const NFTList = (props: Props) => {
  const { vendor, nfts, page, count, isLoading, assets,
    ownerassets,
    onBrowse } = props
  const handleLoadMore = useCallback(() => {
    onBrowse({ page: page + 1 })
  }, [onBrowse, page])

  const maxQuerySize = getMaxQuerySize(vendor)

  const hasExtraPages =
    ((count && (nfts.length + assets.length
      + ownerassets.length
    ) < count) || count === maxQuerySize) && page <= MAX_PAGE
  const isLoadingNewPage = isLoading && nfts.length >= PAGE_SIZE
  return (
    <>
      <Card.Group>
        {assets.length > 0
          ? assets.map((asset, index) => (
            <AssetCard key={asset.OptionID + '-' + index} asset={asset} />
          ))
          : null}
        {ownerassets.length > 0
          ? ownerassets.map((asset, index) => (
            <AssetCard key={asset.AssetID + '-' + index} asset={
              {
                Category: AssetCategory.CHEST,
                ImageURL: "https://spacey2025.s3.us-east-2.amazonaws.com/xinpian2.png",
                AssetID: asset.AssetID,
                OptionID: asset.OptionID

              }
            } />
          ))
          : null}
        {nfts.length > 0
          ? nfts.map((nft, index) => (
            <NFTCard key={nft.id + '-' + index} nft={nft} />
          ))
          : null}



        {isLoading ? (
          <>
            <div className="overlay" />
            <Loader size="massive" active />
          </>
        ) : null}
      </Card.Group>

      {nfts.length === 0 && assets.length === 0 && !isLoading ? (
        <div className="empty">{t('nft_list.empty')}</div>
      ) : null}

      {nfts.length > 0 && hasExtraPages && (!isLoading || isLoadingNewPage) ? (
        <div className="load-more">
          <Button loading={isLoading} inverted primary onClick={handleLoadMore}>
            {t('global.load_more')}
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default React.memo(NFTList)
