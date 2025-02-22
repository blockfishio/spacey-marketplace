import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Intercom from 'decentraland-dapps/dist/components/Intercom'

import { locations } from '../../modules/routing/locations'
import { BrowsePage } from '../BrowsePage'
import { AccountPage } from '../AccountPage'
import { SignInPage } from '../SignInPage'
import { SettingsPage } from '../SettingsPage'
import { NFTPage } from '../NFTPage'
import { SellPage } from '../SellPage'
import { BuyPage } from '../BuyPage'
import { BuyAssetPage } from '../BuyAssetPage'
// import { BidPage } from '../BidPage'
import { CancelSalePage } from '../CancelSalePage'
import { TransferPage } from '../TransferPage'
// import { RenamePage } from '../RenamePage'
import { ActivityPage } from '../ActivityPage'
// import { PartnersPage } from '../PartnersPage'
import { CommunityPage } from '../CommunityPage'
import { OfficalPage } from '../OfficalPage'
import { AssetPage } from '../AssetPage'
import { AssetPage as OwnerAssetPage } from '../OwnerAssetPage'
import { ClaimPage } from '../ClaimPage'
import { DepositPage } from '../DepositPage'

import { HomePage } from '../HomePage'
import { MyBidsPage } from '../MyBidsPage'
import { LegacyNFTPage } from '../LegacyNFTPage'

const Routes = () => {
  const APP_ID = process.env.REACT_APP_INTERCOM_APP_ID
  return (
    <>
      <Switch>
        <Route exact path={locations.browse()} component={BrowsePage} />
        <Route
          exact
          path={locations.currentAccount()}
          component={AccountPage}
        />
        <Route exact path={locations.account()} component={AccountPage} />
        <Route exact path={locations.bids()} component={MyBidsPage} />
        <Route exact path={locations.signIn()} component={SignInPage} />
        <Route exact path={locations.sell()} component={SellPage} />
        <Route exact path={locations.buy()} component={BuyPage} />
        <Route exact path={locations.buyasset()} component={BuyAssetPage} />
        {/* <Route exact path={locations.bid()} component={BidPage} /> */}
        <Route exact path={locations.cancel()} component={CancelSalePage} />
        <Route exact path={locations.transfer()} component={TransferPage} />
        <Route exact path={locations.nft()} component={NFTPage} />
        <Route exact path={locations.settings()} component={SettingsPage} />
        <Route exact path={locations.community()} component={CommunityPage} />
        <Route exact path={locations.offical()} component={OfficalPage} />
        {/* <Route exact path={locations.rename()} component={RenamePage} /> */}
        <Route exact path={locations.activity()} component={ActivityPage} />
        <Route exact path={locations.root()} component={HomePage} />
        <Route exact path={locations.parcel()} component={LegacyNFTPage} />
        <Route exact path={locations.estate()} component={LegacyNFTPage} />
        <Route exact path={locations.asset()} component={AssetPage} />
        <Route exact path={locations.ownerasset()} component={OwnerAssetPage} />
        <Route exact path={locations.claim()} component={ClaimPage} />
        <Route exact path={locations.deposit()} component={DepositPage} />


        <Redirect
          from="/browse"
          to={locations.offical() + window.location.search}
          push
        />
        <Redirect
          from="/offical"
          to={locations.offical() + window.location.search}
          push
        />
        <Redirect to={locations.root()} />
      </Switch>
      {APP_ID ? (
        <Intercom appId={APP_ID} settings={{ alignment: 'right' }} />
      ) : null}
    </>
  )
}

export default Routes
