import { action } from 'typesafe-actions'
import { ProviderType } from 'decentraland-connect'

export const AUTHENTICATE = '[Authenticate]'
export const AUTHENTICATE_REQUEST = '[Reqsuest] Authenticate'
export const AUTHENTICATE_SUCCESS = '[Success] Authenticate'
export const AUTHENTICATE_FAILURE = '[Failure] Authenticate'

export const AuthenticateRequest = () => action(AUTHENTICATE_REQUEST)
export const AuthenticateSuccess = () => action(AUTHENTICATE_SUCCESS)
export const AuthenticateFailure = () => action(AUTHENTICATE_FAILURE)
export const authenticate = (
  provider: ProviderType | null
) => action(AUTHENTICATE, {
  provider
})


export type AuthenticateAction = ReturnType<typeof authenticate>