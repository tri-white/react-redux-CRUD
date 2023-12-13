import React from 'react';
import { useSelector } from 'react-redux';
const EmployeeComponent = () =>{
const employees = useSelector((state)=> state.allEmployees.employees);
const renderList = employees.map((employee)=>{
    const {_id, name, department} = employee;
    return (
<>
    <td>{_id}</td>
    <td>{name}</td>
    <td>{department}</td>
    <td>
        Delete
    </td>
</>
        
    );
})
return(
    <>{renderList}</>
)
}

export default EmployeeComponent;