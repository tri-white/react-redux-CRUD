import { combineReducers } from "redux";
import {employeeReducer} from "./employeeReducer"

const reducers = combineReducers({
    allEmployees: employeeReducer,
})

export default reducers;