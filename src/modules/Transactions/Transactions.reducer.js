// Do not send actions to this reducer
// Only the core should send actions to this reducer
import { combineReducers } from 'redux'
import * as ACTION from './Transactions.action.js'

const initialState = {
  byId: {},
  allIds: []
}

export const transactions = (state = initialState, action) => {
  return {
    byId: byId(state.byId, action),
    allIds: allIds(state.allIds, action)
  }
}

const byId = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TRANSACTION:
      const transaction = schema(action.data.transaction)

      return {
        ...state,
        [transaction.txid]: transaction
      }

    default:
      return state
  }
}

const allIds = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TRANSACTION:
      const transaction = action.data.transaction
      return getNewArrayWithItem(state, transaction.txid)

    default:
      return state
  }
}


const updatingBalance = (state = true, action) => {
  switch (action.type) {
    case ACTION.ENABLE_UPDATING_BALANCE : 
      return true
    case ACTION.DISABLE_UPDATING_BALANCE : 
      return false
    case ACTION.TOGGLE_UPDATING_BALANCE :
      return !state
    default :
      return state
  }
}

const transactionList = combineReducers({
  transactions
})

const schema = (transaction) => {
  txid = transaction.txid
  walletTx = transaction.walletTx
  metadata = transaction.metadata
  date = transaction.date
  blockHeight = transaction.blockHeight
  amountSatoshi = transaction.amountSatoshi
  providerFee = transaction.providerFee
  networkFee = transaction.networkFee
  runningBalance = transaction.runningBalance
  signedTx = transaction.signedTx
  otherParams = transaction.otherParams

  newTransaction = {
    txid,
    date,
    amountSatoshi,
    signedTx,
    metadata
  }

  return newTransaction
}

const getNewArrayWithItem = (list, item) => {
  if (!list.includes(item)) {
    return [...list, item]
  }

  return list
}
