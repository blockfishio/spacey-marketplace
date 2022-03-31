import React from 'react'
import { Loader } from 'spacey-ui'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import { AssetProvider } from '../AssetProvider'
// import { AssetProvider } from '../AssetProvider'
import { Props } from './AssetProviderPage.types'

const Loading = () => (
  <div className="nft-center">
    <Loader active size="huge" />
  </div>
)

const NotFound = () => (
  <div className="nft-center">
    <p className="secondary-text">{t('global.not_found')}&hellip;</p>
  </div>
)

const AssetProviderPage = (props: Props) => {
  const { isConnecting, children } = props
  return (
    <AssetProvider>
      {(asset, isNFTLoading) => {
        const isLoading = isConnecting || isNFTLoading
        return (
          <>
            {isLoading ? <Loading /> : null}
            {!isLoading && !asset ? <NotFound /> : null}
            {!isLoading && asset ? children(asset) : null}
          </>
        )
      }}
    </AssetProvider>
  )
}

export default React.memo(AssetProviderPage)
