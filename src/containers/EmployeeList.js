import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeComponent from './EmployeeComponent'
import axios from 'axios';
import { deleteEmployee, setEmployees } from '../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';
import AddEmployee from './ADD/AddEmployee';
import UpdateEmployee from './UPDATE/UpdateEmployee';
const EmployeeList = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        const response = await axios.
        get("http://localhost:3001/api/employees/").
        catch((err) => {
            console.log("Err", err);
        });
        dispatch(setEmployees(response.data));
        
    }
    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddEmployeeClick = () => {
        navigate('/employees/add');
      };
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/api/employees/${id}`);
        dispatch(deleteEmployee(id));

    };

      
    const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);


  
  const handleUpdateClick = (id) => {
    navigate(`/employees/update/${id}`);
  };
  
    const employees2 = useSelector((state)=> state.allEmployees.employees);
const renderList = employees2.map((employee)=>{
    const {_id, name, department} = employee;
    return (
<tr>
    <td>{_id}</td>
    <td>{name}</td>
    <td>{department}</td>
    <td>
    <button className="btn btn-primary" onClick={() => handleUpdateClick(_id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDelete(_id)}>Delete</button>
        </td>
    </tr>
        
    );
})
    return(
        <div className=''>
            <button className="btn btn-success" onClick={handleAddEmployeeClick}>
        Add Employee
      </button>
            <table className="table">
        <thead>
            <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
                {renderList}
                {showUpdateForm && (
        <UpdateEmployeeForm
          employeeId={selectedEmployeeId}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
        </tbody>
    </table>
            
        </div>
    )
}

export default EmployeeList;