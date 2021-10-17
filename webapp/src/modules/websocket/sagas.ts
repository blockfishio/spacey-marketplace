import {
  takeEvery,
  put
} from 'redux-saga/effects'

import {
  WS_CONNECT_REQUEST,
  WS_DISCONNECT_REQUEST,
  // WS_CONNECT_SUCCESS,
  wsConnectRequestAction,
  wsConnectSuccess,
  // wsConnectingAction,
  wsDisconnectRequestAction,
  // wsDisConnectedAction,
  // wsConnectRequest,
  // wsDisconnectRequest,
  wsDisconnectedRequest,
  WS_CONNECT_SUCCESS,
  wsConnectSuccessAction
} from './actions'

import {
  authenticate,
  // AuthenticateAction
} from '../authenticate/actions'






export function* wsSaga() {
  yield takeEvery(WS_CONNECT_REQUEST, handleWsConnectRequest)
  yield takeEvery(WS_DISCONNECT_REQUEST, handleWsDisconnectRequest)
  yield takeEvery(WS_CONNECT_SUCCESS, handleWsConnectSuccess)
}


let rws: WebSocket | null = null

async function initWebsocket(
  // obj: any
) {
  let url = 'wss://testplay.spacey2025.com/ws/connect'
  rws = new WebSocket(url)
  rws.onopen = () => {

  }
  rws.onclose = () => {
    // put(wsDisconnectRequest())
  }
}

async function disconnectWebsocket(
  // obj: any
) {
  // console.log(obj)
  while (rws != null) {
    rws.close()
  }
  rws = null
}


function* handleWsConnectRequest(_action: wsConnectRequestAction) {
  try {
    initWebsocket(
      // _action
    )
    const { address, provider } = _action.payload
    yield put(wsConnectSuccess(address, provider))
  }
  catch (error) {
    console.error(error)
  }

}

function* handleWsDisconnectRequest(_action: wsDisconnectRequestAction) {
  try {
    disconnectWebsocket(
      // _action
    )
    yield put(wsDisconnectedRequest())
  }
  catch (error) {
    console.error(error)
  }
}

function* handleWsConnectSuccess(_action: wsConnectSuccessAction) {
  const { provider } = _action.payload
  // const action: AuthenticateAction = {
  //   type: "[Authenticate]", payload: { provider }
  // }
  yield put(authenticate(provider))
}










