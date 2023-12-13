
import { ActionTypes } from '../constants/action-types';

const initialState = {
  expenseTypes: [],
};

export const expenseTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_EXPENSE_TYPES:
      return { ...state, expenseTypes: action.payload };
    case ActionTypes.ADD_EXPENSE_TYPE:
      return { ...state, expenseTypes: [...state.expenseTypes, action.payload] };
    case ActionTypes.DELETE_EXPENSE_TYPE:
      return {
        ...state,
        expenseTypes: state.expenseTypes.filter((expenseType) => expenseType._id !== action.payload),
      };
    default:
      return state;
  }
};
