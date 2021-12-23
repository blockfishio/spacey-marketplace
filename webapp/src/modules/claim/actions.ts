import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'decentraland-dapps/dist/modules/transaction/utils'


import { ChainId } from '@dcl/schemas'

// Claim Metamars 

export const CLAIM_METAMARS_REQUEST = '[Request] Claim Metamars'
export const CLAIM_METAMARS_SUCCESS = '[Success] Claim Metamars'
export const CLAIM_METAMARS_FAILURE = '[Failure] Claim Metamars'

export const claimMetamarsRequest = (
  amount: number,
) => action(CLAIM_METAMARS_REQUEST, { amount })
export const claimMetamarsSuccess = (
  amount: number,
  chainId: ChainId,
  txHash: string
) =>
  action(CLAIM_METAMARS_SUCCESS, {
    amount,
    ...buildTransactionPayload(chainId, txHash, {
      amount
    })
  })
export const claimMetamarsFailure = (
  amount: number,
  error: string
) => action(CLAIM_METAMARS_FAILURE, { amount, error })

export type ClaimMetamarsRequestAction = ReturnType<typeof claimMetamarsRequest>
export type ClaimMetamarsSuccessAction = ReturnType<typeof claimMetamarsSuccess>
export type ClaimMetamarsFailureAction = ReturnType<typeof claimMetamarsFailure>

