import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'spacey-dapps/dist/modules/transaction/utils'


import { ChainId } from '@spacey2025/schemas'
import { Claimable } from './types'

// Fetch Claimable 

export const FETCH_CLAIMABLE_REQUEST = '[Request] Fetch Claimable'
export const FETCH_CLAIMABLE_SUCCESS = '[Success] Fetch Claimable'
export const FETCH_CLAIMABLE_FAILURE = '[Failure] Fetch Claimable'


export const fetchClaimableSuccess = (
  claimable: Claimable
) =>
  action(FETCH_CLAIMABLE_SUCCESS, {
    claimable
  })
export const fetchClaimableFailure = (
  error: string
) => action(FETCH_CLAIMABLE_FAILURE, { error })

export type FetchClaimableSuccessAction = ReturnType<typeof fetchClaimableSuccess>
export type FetchClaimableFailureAction = ReturnType<typeof fetchClaimableFailure>







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

