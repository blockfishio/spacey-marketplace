import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import {
  renameNFTRequest,
  RenameNFTRequestAction
} from '../../modules/nft/actions'

export type Props = {
  onRename: typeof renameNFTRequest
  onNavigate: (path: string) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onRename'>
export type MapDispatch = Dispatch<
  CallHistoryMethodAction | RenameNFTRequestAction
>
