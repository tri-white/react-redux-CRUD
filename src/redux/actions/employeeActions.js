import { ActionTypes } from "../constants/action-types"

export const setEmployees = (employees) => {
    return {
        type: ActionTypes.SET_EMPLOYEES,
        payload: employees,
    }
}

export const selectedEmployees = (employee) => {
    return {
        type: ActionTypes.SELECTED_EMPLOYEES,
        payload: employee,
    }
}

export const addEmployee = (employee) => ({
    type: ActionTypes.ADD_EMPLOYEE,
    payload: employee,
  });

export const deleteEmployee = (id) => ({
    type: ActionTypes.DELETE_EMPLOYEE,
    payload: id,
  });
