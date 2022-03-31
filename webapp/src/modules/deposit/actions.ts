import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'spacey-dapps/dist/modules/transaction/utils'


import { ChainId } from '@spacey2025/schemas'

// Deposit GMars 

export const DEPOSIT_GMARS_REQUEST = '[Request] Deposit GMars'
export const DEPOSIT_GMARS_SUCCESS = '[Success] Claim GMars'
export const DEPOSIT_GMARS_FAILURE = '[Failure] Claim GMars'

export const depositGMarsRequest = (
  amount: number,
) => action(DEPOSIT_GMARS_REQUEST, { amount })
export const depositGMarsSuccess = (
  amount: number,
  chainId: ChainId,
  txHash: string
) =>
  action(DEPOSIT_GMARS_SUCCESS, {
    amount,
    ...buildTransactionPayload(chainId, txHash, {
      amount
    })
  })
export const depositGMarsFailure = (
  amount: number,
  error: string
) => action(DEPOSIT_GMARS_FAILURE, { amount, error })

export type DepositGMarsRequestAction = ReturnType<typeof depositGMarsRequest>
export type DepositGMarsSuccessAction = ReturnType<typeof depositGMarsSuccess>
export type DepositGMarsFailureAction = ReturnType<typeof depositGMarsFailure>

