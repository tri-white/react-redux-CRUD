import { createSlice } from "@reduxjs/toolkit";
import { employeesList } from "./EmployeesData";

const userSlice = createSlice({
    name: "users",
    initialState: employeesList,
    reducers: {
        addUser: (state, action)=>{
            state.push(action.payload)
        },
        updateUser: (state,action)=>{
            const {name} = action.payload; // it's not found because i just updated name, and it's not the same anymore
            const uu = state.find(user => user.name == name);
            if(uu){
                uu.name = name;
            }
            else{
                console.log('error');
            }
        },
        deleteUser: (state,action) =>{
            const {name} = action.payload;
            const uu = state.find(user => user.name == name);
            if(uu){
                return state.filter(f => f.name !== name);
            }
        }
    }
})

export const {addUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;