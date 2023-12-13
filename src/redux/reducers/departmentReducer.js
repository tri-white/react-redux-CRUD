// DepartmentReducer.js
import { ActionTypes } from '../constants/action-types';

const initialState = {
  departments: [],
};

export const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case ActionTypes.ADD_DEPARTMENT:
      return { ...state, departments: [...state.departments, action.payload] };
    case ActionTypes.DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter((department) => department._id !== action.payload),
      };
    default:
      return state;
  }
};
