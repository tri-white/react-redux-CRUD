// src/redux/actions/expenseTypesActions.js

import { ActionTypes } from '../constants/action-types';

export const setExpenseTypes = (expenseTypes) => ({
  type: ActionTypes.SET_EXPENSE_TYPES,
  payload: expenseTypes,
});

export const addExpenseType = (expenseType) => ({
  type: ActionTypes.ADD_EXPENSE_TYPE,
  payload: expenseType,
});

export const deleteExpenseType = (id) => ({
  type: ActionTypes.DELETE_EXPENSE_TYPE,
  payload: id,
});
