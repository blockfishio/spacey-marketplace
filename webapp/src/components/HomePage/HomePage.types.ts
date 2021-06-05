import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import {
  getHomepage,
  getHomepageLoading
} from '../../modules/ui/nft/homepage/selectors'
import {
  getHomepage as getHomepageAsset,
  getHomepageLoading as getHomepageAssetLoading
} from '../../modules/ui/asset/homepage/selectors'
import {
  fetchNFTsFromRoute,
  FetchNFTsFromRouteAction,
  fetchAssetsFromRoute,
  FetchAssetsFromRouteAction
} from '../../modules/routing/actions'

export type Props = {
  homepagenft: ReturnType<typeof getHomepage>
  homepageLoadingnft: ReturnType<typeof getHomepageLoading>
  homepageAsset: ReturnType<typeof getHomepageAsset>
  homepageLoadingAsset: ReturnType<typeof getHomepageAssetLoading>
  onNavigate: (path: string) => void
  onFetchNFTsFromRoute: typeof fetchNFTsFromRoute
  onFetchAssetsFromRoute: typeof fetchAssetsFromRoute
}

export type MapStateProps = Pick<Props, 'homepagenft' | 'homepageLoadingnft' | 'homepageAsset' | 'homepageLoadingAsset'>
export type MapDispatchProps = Pick<
  Props,
  'onFetchNFTsFromRoute' | 'onNavigate' | 'onFetchAssetsFromRoute'
>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | FetchNFTsFromRouteAction | FetchAssetsFromRouteAction
>
