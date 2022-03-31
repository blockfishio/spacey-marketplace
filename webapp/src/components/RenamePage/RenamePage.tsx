import React, { useState } from 'react'
import { Page, Header, Form, Field, Button } from 'spacey-ui'
import { t, T } from 'spacey-dapps/dist/modules/translation/utils'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Wallet } from '../Wallet'
import { NFTProviderPage } from '../NFTProviderPage'
import { NFTAction } from '../NFTAction'
import { locations } from '../../modules/routing/locations'
import { getNFTName, isOwnedBy } from '../../modules/nft/utils'
import { Props } from './RenamePage.types'
import './RenamePage.css'

const RenamePage = (props: Props) => {
  const { onNavigate, onRename } = props

  const [address, setAddress] = useState('')
  const [isInvalidAddress, setIsInvalidAddress] = useState(false)

  return (
    <>
      <Navbar isFullscreen />
      <Page className="RenamePage">
        <Wallet>
          {wallet => (
            <NFTProviderPage>
              {(nft, order) => {
                let subtitle
                let isDisabled = !address || isInvalidAddress
                let canTransfer = true
                const subtitleClasses = ['subtitle']
                const name = getNFTName(nft)
                if (order) {
                  isDisabled = true
                  canTransfer = false
                  subtitleClasses.push('error')
                  subtitle = (
                    <T
                      id="rename_page.for_sale"
                      values={{ name: <b>{name}</b> }}
                    />
                  )
                } else if (!isOwnedBy(nft, wallet)) {
                  isDisabled = true
                  canTransfer = false
                  subtitleClasses.push('error')
                  subtitle = (
                    <T
                      id="rename_page.invalid_owner"
                      values={{ name: <b>{name}</b> }}
                    />
                  )
                } else {
                  subtitle = (
                    <T
                      id="rename_page.subtitle"
                      values={{ name: <b>{name}</b> }}
                    />
                  )
                }
                return (
                  <NFTAction nft={nft}>
                    <Header size="large">
                      {t('rename_page.title', {
                        category: t(`global.${nft.category}`)
                      })}
                    </Header>
                    <div className={subtitleClasses.join(' ')}>{subtitle}</div>
                    <Form onSubmit={() => onRename(nft, address)}>
                      <div className="form-fields">
                        <Field
                          type="name"
                          error={isInvalidAddress}
                          message={
                            isInvalidAddress
                              ? t('rename_page.invalid_name')
                              : undefined
                          }
                          label={t('rename_page.newname')}
                          value={address}
                          placeholder=""
                          disabled={!canTransfer}
                          onChange={(_event, props) => {
                            setAddress(props.value)
                            const isValid =
                              props.value
                            setIsInvalidAddress(!isValid)
                          }}
                        />
                      </div>

                      <div className="buttons">
                        <div
                          className="ui button"
                          onClick={() =>
                            onNavigate(
                              locations.nft(nft.contractAddress, nft.tokenId)
                            )
                          }
                        >
                          {t('global.cancel')}
                        </div>
                        <Button type="submit" primary disabled={isDisabled}>
                          {t('rename_page.submit')}
                        </Button>
                      </div>
                    </Form>
                  </NFTAction>
                )
              }}
            </NFTProviderPage>
          )}
        </Wallet>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(RenamePage)
