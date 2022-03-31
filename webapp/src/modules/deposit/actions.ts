import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'spacey-dapps/dist/modules/transaction/utils'


import { ChainId } from '@spacey2025/schemas'
import { Metamars } from './types'
// Get MetaMars Balance 

export const METAMARS_BALANCE_REQUEST = '[Request] Metamars Balance'
export const METAMARS_BALANCE_SUCCESS = '[Success] Metamars Balance'
export const METAMARS_BALANCE_FAILURE = '[Failure] Metamars Balance'

export const balanceMetamarsRequest = (
  amount: number,
) => action(METAMARS_BALANCE_REQUEST, { amount })
export const balanceMetamarsSuccess = (
  metamars: Metamars
) =>
  action(METAMARS_BALANCE_SUCCESS, {
    metamars
  })
export const balanceMetamarsFailure = (
  error: string
) => action(METAMARS_BALANCE_FAILURE, { error })

export type MetamarsBalanceRequestAction = ReturnType<typeof balanceMetamarsRequest>
export type MetamarsBalanceSuccessAction = ReturnType<typeof balanceMetamarsSuccess>
export type MetamarsBalanceFailureAction = ReturnType<typeof balanceMetamarsFailure>





// Deposit GMars 

export const DEPOSIT_GMARS_REQUEST = '[Request] Deposit GMars'
export const DEPOSIT_GMARS_SUCCESS = '[Success] Deposit GMars'
export const DEPOSIT_GMARS_FAILURE = '[Failure] Deposit GMars'

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

