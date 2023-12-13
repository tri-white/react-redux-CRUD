import { ActionTypes } from "../constants/action-types"


const initialState = {
    employees:[],
}

export const employeeReducer = (state = initialState,action)=>{

    switch(action.type){
        case ActionTypes.SET_EMPLOYEES:
            return {...state, employees:action.payload};
        case ActionTypes.ADD_EMPLOYEE:
                return { ...state, employees: [...state.employees, action.payload] };
        case ActionTypes.DELETE_EMPLOYEE:
                return {
                    ...state,
                    employees: state.employees.filter((employee) => String(employee._id) !== String(action.payload)),
                };
        default:
            return state;
    }
}