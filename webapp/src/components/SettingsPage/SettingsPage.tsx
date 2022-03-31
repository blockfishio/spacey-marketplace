import React, { useState, useEffect, useCallback } from 'react'
// import { Network } from '@spacey2025/schemas'
import { t } from 'spacey-dapps/dist/modules/translation/utils'
import { Footer } from 'spacey-dapps/dist/containers'
import { isMobile } from 'spacey-dapps/dist/lib/utils'
import {
  Page, Grid, Blockie,
  Mana,
  Loader, Form
} from 'spacey-ui'
import CopyToClipboard from 'react-copy-to-clipboard'

import { locations } from '../../modules/routing/locations'
import { contractAddressesAll } from '../../modules/contract/utils'
import { hasAuthorization } from '../../modules/authorization/utils'
import { shortenAddress } from '../../modules/wallet/utils'
import { AuthorizationType } from '../AuthorizationModal/AuthorizationModal.types'
import { Navbar } from '../Navbar'
import { Navigation } from '../Navigation'
import { Authorization } from './Authorization'
import { Props } from './SettingsPage.types'
import './SettingsPage.css'
import { Link } from 'react-router-dom'
// import { ChainId } from '../../modules/contract/types'




// const BUY_MANA_URL = process.env.REACT_APP_BUY_MANA_URL

const SettingsPage = (props: Props) => {
  const {
    wallet,
    claimable,
    metamars,
    authorizations,
    pendingAllowTransactions,
    pendingApproveTransactions,
    isLoadingAuthorization,
    isConnecting,
    onAllowToken,
    onApproveToken,
    onNavigate
  } = props

  const [hasCopiedText, setHasCopiedText] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  )

  const handleOnCopy = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setHasCopiedText(true)
    const newTimeoutId = setTimeout(() => setHasCopiedText(false), 1200)
    setTimeoutId(newTimeoutId)
  }, [timeoutId])

  useEffect(() => {
    if (!isConnecting && !wallet) {
      onNavigate(locations.signIn())
    }
  }, [isConnecting, wallet, onNavigate])

  const hasEmptyAuthorizations =
    authorizations === undefined || Object.keys(authorizations).length === 0

  var manaContent = [];
  if (wallet) {
    for (const [k, v] of Object.entries(wallet.networks)) {


      manaContent.push(<Mana key={k}>
        {parseInt(
          v.mana.toFixed(0),
          10
        ).toLocaleString()}
      </Mana>)
    }
  }

  return (
    <>
      <Navbar isFullscreen />
      <Navigation />
      <Page className="SettingsPage">
        {isConnecting ? (
          <Loader size="massive" active />
        ) : wallet ? (
          <Grid>
            <Grid.Row>
              <Grid.Column
                className="left-column secondary-text"
                computer={4}
                mobile={16}
              >
                {t('global.address')}
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                <div className="blockie-container">
                  <Blockie seed={wallet.address} scale={12} />
                </div>
                <div className="address-container">
                  <div className="address">
                    {isMobile()
                      ? shortenAddress(wallet.address)
                      : wallet.address}
                  </div>
                  <CopyToClipboard text={wallet.address} onCopy={handleOnCopy}>
                    {hasCopiedText ? (
                      <span className="copy-text">
                        {t('settings_page.copied')}
                      </span>
                    ) : (
                      <span className="copy-text link">
                        {t('settings_page.copy_address')}
                      </span>
                    )}
                  </CopyToClipboard>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column
                className="left-column secondary-text"
                computer={4}
                mobile={16}
              >
                {t('global.claimable_mars')}
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                <div className="balance">



                  {claimable?.networks[claimable.network].claimable}

                  <Link
                    className="buy-more"
                    to={locations.claim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('settings_page.claim')}
                  </Link>



                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                className="left-column secondary-text"
                computer={4}
                mobile={16}
              >
                {t('global.balance_metamars')}
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                <div className="balance">


                  {metamars?.networks[metamars.network].balance}

                  <Link
                    className="buy-more"
                    to={locations.deposit()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('settings_page.deposit')}
                  </Link>



                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                className="left-column secondary-text"
                computer={4}
                mobile={16}
              >
                {t('settings_page.authorizations')}
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                {isLoadingAuthorization ? (
                  <Loader size="massive" active />
                ) : (
                  <div className="authorization-checks-container">
                    {hasEmptyAuthorizations ? (
                      <div className="authorization-checks">
                        <p className="danger-text">
                          {t('settings_page.authorization_error')}
                          <br />
                          {t('settings_page.authorization_error_contact')}
                        </p>
                      </div>
                    ) : (
                      <Form>
                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_buying')}
                          </label>
                          <Authorization
                            wallet={wallet}
                            checked={hasAuthorization(
                              authorizations!,
                              contractAddressesAll[wallet.chainId].Marketplace,
                              contractAddressesAll[wallet.chainId].MANAToken,
                              AuthorizationType.ALLOWANCE
                            )}
                            contractAddress={contractAddressesAll[wallet.chainId].Marketplace}
                            tokenContractAddress={contractAddressesAll[wallet.chainId].MANAToken}
                            pendingTransactions={pendingAllowTransactions}
                            onChange={onAllowToken}
                          />
                          <Authorization
                            wallet={wallet}
                            checked={hasAuthorization(
                              authorizations!,
                              contractAddressesAll[wallet.chainId].AssetSale,
                              contractAddressesAll[wallet.chainId].MANAToken,
                              AuthorizationType.ALLOWANCE
                            )}
                            contractAddress={
                              contractAddressesAll[wallet.chainId].AssetSale
                            }
                            tokenContractAddress={contractAddressesAll[wallet.chainId].MANAToken}
                            pendingTransactions={pendingAllowTransactions}
                            onChange={onAllowToken}
                          />
                          {
                            // wallet.chainId == ChainId.BSC_MAINNET ?
                            <Authorization
                              wallet={wallet}
                              checked={hasAuthorization(
                                authorizations!,
                                contractAddressesAll[wallet.chainId].DepositGMars,
                                contractAddressesAll[wallet.chainId].METAMARSToken,
                                AuthorizationType.ALLOWANCE
                              )}
                              contractAddress={
                                contractAddressesAll[wallet.chainId].DepositGMars
                              }
                              tokenContractAddress={contractAddressesAll[wallet.chainId].METAMARSToken}
                              pendingTransactions={pendingAllowTransactions}
                              onChange={onAllowToken}
                            />
                            // : null
                          }
                        </div>



                        <div className="authorization-checks">
                          <label className="secondary-text">
                            {t('settings_page.for_selling')}
                          </label>


                          <Authorization
                            wallet={wallet}
                            checked={hasAuthorization(
                              authorizations!,
                              contractAddressesAll[wallet.chainId].Marketplace,
                              contractAddressesAll[wallet.chainId].SpaceY2025,
                              AuthorizationType.APPROVAL
                            )}
                            contractAddress={contractAddressesAll[wallet.chainId].Marketplace}
                            tokenContractAddress={
                              contractAddressesAll[wallet.chainId].SpaceY2025
                            }
                            pendingTransactions={
                              pendingApproveTransactions
                            }
                            onChange={onApproveToken}
                          />


                          {/* {Object.keys(authorizations!.approvals).map(
                            contractAddress => {
                              const privilege = authorizations!.approvals[
                                contractAddress
                              ]
                              console.log(authorizations!.approvals)
                              console.log(privilege)
                              return !privilege
                                ? null
                                : Object.keys(
                                  privilege
                                ).map(tokenContractAddress => (
                                  <Authorization
                                    key={
                                      contractAddress + tokenContractAddress
                                    }
                                    checked={privilege[tokenContractAddress]}
                                    contractAddress={contractAddress}
                                    tokenContractAddress={
                                      tokenContractAddress
                                    }
                                    pendingTransactions={
                                      pendingApproveTransactions
                                    }
                                    onChange={onApproveToken}
                                  />
                                ))
                            }
                          )} */}
                        </div>
                      </Form>
                    )}
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(SettingsPage)
