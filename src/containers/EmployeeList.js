import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteEmployee, setEmployees, addEmployee } from '../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';
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


  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/employees/', {
        name,
        department,
      });
      dispatch(addEmployee(response.data));

      setName('');
      setDepartment('');
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

    return(
        <div className=''>

      <div className="container">
      <h2>Add Employee</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </form>
    </div>
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
        </tbody>
    </table>
            
        </div>
    )
}

export default EmployeeList;