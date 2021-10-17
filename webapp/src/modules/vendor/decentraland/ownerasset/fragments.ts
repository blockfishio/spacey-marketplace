
import { Asset } from '../../../asset/types'





export type AssetFields = Omit<Asset, 'activeOrderId' | 'owner'>
export type AssetFragment = Omit<AssetFields, 'vendor'>
