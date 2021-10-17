import { action } from 'typesafe-actions'

import { SearchOptions } from './types'

// Browse

export const BROWSE = 'Browse'

export const browse = (searchOptions: SearchOptions) =>
  action(BROWSE, { searchOptions })

export type BrowseAction = ReturnType<typeof browse>

// Navigate

export const FETCH_NFTS_FROM_ROUTE = 'Fetch NFTs from route'

export const fetchNFTsFromRoute = (searchOptions: SearchOptions) =>
  action(FETCH_NFTS_FROM_ROUTE, { searchOptions })

export type FetchNFTsFromRouteAction = ReturnType<typeof fetchNFTsFromRoute>


export const FETCH_ASSETS_FROM_ROUTE = 'Fetch Assets from route'

export const fetchAssetsFromRoute = (searchOptions: SearchOptions) =>
  action(FETCH_ASSETS_FROM_ROUTE, { searchOptions })

export type FetchAssetsFromRouteAction = ReturnType<typeof fetchAssetsFromRoute>

export const FETCH_OWNERASSETS_FROM_ROUTE = 'Fetch Owner Assets from route'

export const fetchOwnerAssetsFromRoute = (searchOptions: SearchOptions) =>
  action(FETCH_OWNERASSETS_FROM_ROUTE, { searchOptions })

export type FetchOwnerAssetsFromRouteAction = ReturnType<typeof fetchOwnerAssetsFromRoute>




// Load More

export const SET_IS_LOAD_MORE = 'Set is load more'

export const setIsLoadMore = (isLoadMore: boolean) =>
  action(SET_IS_LOAD_MORE, { isLoadMore })

export type SetIsLoadMoreAction = ReturnType<typeof setIsLoadMore>
