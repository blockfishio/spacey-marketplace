import { Vendors } from '../types'

import * as decentraland from '../decentraland'

export type NFTsFetchFilters<
  V extends Vendors | unknown = unknown
  > = V extends Vendors.DECENTRALAND
  ? decentraland.NFTsFetchFilters
  : V extends unknown
  ?
  | decentraland.NFTsFetchFilters

  : never
