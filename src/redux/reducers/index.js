import { combineReducers } from "redux";
import {employeeReducer} from "./employeeReducer"
import { departmentReducer } from "./departmentReducer";
import { expenseTypesReducer } from "./expenseTypesReducer";
const reducers = combineReducers({
    allEmployees: employeeReducer,
    allDepartments: departmentReducer,
    allExpenseTypes: expenseTypesReducer,
})

export default reducers;