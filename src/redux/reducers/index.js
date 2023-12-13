import { combineReducers } from "redux";
import {employeeReducer} from "./employeeReducer"
import { departmentReducer } from "./departmentReducer";
import { expenseTypesReducer } from "./expenseTypesReducer";
import { expenseDocumentReducer } from "./expenseDocumentReducer";
const reducers = combineReducers({
    allEmployees: employeeReducer,
    allDepartments: departmentReducer,
    allExpenseTypes: expenseTypesReducer,
    allExpenseDocuments: expenseDocumentReducer
})

export default reducers;