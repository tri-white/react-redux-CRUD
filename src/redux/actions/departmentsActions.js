// DepartmentActions.js
import { ActionTypes } from '../constants/action-types';

export const setDepartments = (departments) => ({
  type: ActionTypes.SET_DEPARTMENTS,
  payload: departments,
});

export const addDepartment = (department) => ({
  type: ActionTypes.ADD_DEPARTMENT,
  payload: department,
});

export const deleteDepartment = (departmentId) => ({
  type: ActionTypes.DELETE_DEPARTMENT,
  payload: departmentId,
});
