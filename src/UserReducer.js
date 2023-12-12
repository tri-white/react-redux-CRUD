import { createSlice } from "@reduxjs/toolkit";
import { employeesList } from "./EmployeesData";

const userSlice = createSlice({
    name: "users",
    initialState: employeesList,
    reducers: {

    }
})

export default userSlice.reducer;