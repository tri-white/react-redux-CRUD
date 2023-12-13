// reducers/expenseDocumentReducer.js
import { ActionTypes } from '../constants/action-types';

const initialState = {
  expenseDocuments: [],
};

export const expenseDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_EXPENSE_DOCUMENTS:
      return { ...state, expenseDocuments: action.payload };
    case ActionTypes.ADD_EXPENSE_DOCUMENT:
      return { ...state, expenseDocuments: [...state.expenseDocuments, action.payload] };
    case ActionTypes.DELETE_EXPENSE_DOCUMENT:
      return {
        ...state,
        expenseDocuments: state.expenseDocuments.filter((doc) => doc._id !== action.payload),
      };
    default:
      return state;
  }
};
