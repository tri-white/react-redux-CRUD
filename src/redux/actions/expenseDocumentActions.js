// actions/expenseDocumentActions.js
import { ActionTypes } from '../constants/action-types';

export const setExpenseDocuments = (payload) => ({
  type: ActionTypes.SET_EXPENSE_DOCUMENTS,
  payload,
});

export const addExpenseDocument = (payload) => ({
  type: ActionTypes.ADD_EXPENSE_DOCUMENT,
  payload,
});

export const deleteExpenseDocument = (id) => ({
  type: ActionTypes.DELETE_EXPENSE_DOCUMENT,
  payload: id,
});
