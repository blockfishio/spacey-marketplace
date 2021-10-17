import { ProviderType } from 'decentraland-connect/dist'
import { action } from 'typesafe-actions'
export const WS_CONNECT_REQUEST = '[Request] WS Connect'
export const WS_CONNECTING_REQUEST = '[Request] WS Connecting'
export const WS_CONNECT_SUCCESS = '[Success] WS Connect'
export const WS_DISCONNECT_REQUEST = '[Request] WS Disconnect'
export const WS_DISCONNECTED_REQUEST = '[Request] Ws Disconnected'

export const wsConnectRequest = (address: string, provider: ProviderType) => action(WS_CONNECT_REQUEST, { address, provider })
export const wsConnectingRequest = () => action(WS_CONNECTING_REQUEST)
export const wsConnectSuccess = (address: string, provider: ProviderType) => action(WS_CONNECT_SUCCESS, { address, provider })
export const wsDisconnectRequest = () => action(WS_DISCONNECT_REQUEST)
export const wsDisconnectedRequest = () => action(WS_DISCONNECTED_REQUEST)



export type wsConnectRequestAction = ReturnType<typeof wsConnectRequest>
export type wsConnectingAction = ReturnType<typeof wsConnectingRequest>
export type wsConnectSuccessAction = ReturnType<typeof wsConnectSuccess>
export type wsDisconnectRequestAction = ReturnType<typeof wsDisconnectRequest>
export type wsDisConnectedAction = ReturnType<typeof wsDisconnectedRequest>



// export const wsConnect = host: String => ({ type: 'WS_CONNECT', host });
// export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
// export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
// export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
// export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });
// export const WS_CONNECT_FAILURE = '[Failure] Ws Connect'