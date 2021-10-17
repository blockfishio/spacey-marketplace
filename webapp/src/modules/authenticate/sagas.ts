import {
  // takeEvery,
  takeLatest
  // put
} from 'redux-saga/effects'

import {
  // authenticate,
  AUTHENTICATE,
  // AuthenticateAction

} from './actions'

export function* authenticateSaga() {
  yield takeLatest(AUTHENTICATE, handleAuthenticate)

}

function* handleAuthenticate(
  // _action: AuthenticateAction
) {
  // console.log('auth')
  // console.log(_action)
  // const { provider } = _action.payload
  // console.log(provider)
}