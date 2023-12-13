import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDepartments, addDepartment, deleteDepartment } from '../redux/actions/departmentsActions';
import { useNavigate } from 'react-router-dom';
const DepartmentList = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.allDepartments.departments);
const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/departments/');
        dispatch(setDepartments(response.data));
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [dispatch]);

  const handleAddDepartment = async (name) => {
    try {
      const response = await axios.post('http://localhost:3001/api/departments/', { name });
      dispatch(addDepartment(response.data));
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/departments/${id}`);
      dispatch(deleteDepartment(id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };
  const handleUpdateClick = (id) => {
    navigate(`/departments/update/${id}`);
  };

  const renderList = departments.map((department)=>{
    const {_id, name} = department;
    return (
<tr key={department._id}>
    <td>{_id}</td>
    <td>{name}</td>
    <td>
    <button className="btn btn-primary" onClick={() => handleUpdateClick(_id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteDepartment(_id)}>Delete</button>
        </td>
    </tr>
        
    );
})
  return (
    <div>
      <h2>Departments</h2>
      <div>
        <h3>Add Department</h3>
        <input type="text" id="departmentName" />
        <button onClick={() => handleAddDepartment(document.getElementById('departmentName').value)}>
          Add Department
        </button>
      </div>
      <div>
        <h3>Departments List</h3>
        <table className="table">
        <thead>
            <tr>

                <th>ID</th>
                <th>Name of department</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
                {renderList}
        </tbody>
    </table>
      </div>
    </div>
  );
};

export default DepartmentList;
