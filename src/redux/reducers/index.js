import { combineReducers } from "redux";
import {employeeReducer} from "./employeeReducer"
import { departmentReducer } from "./departmentReducer";
const reducers = combineReducers({
    allEmployees: employeeReducer,
    allDepartments: departmentReducer,
})

export default reducers;