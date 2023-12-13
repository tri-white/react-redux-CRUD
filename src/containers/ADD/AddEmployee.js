import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setEmployees } from '../../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
    const navigate = useNavigate();
  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/employees/', {
        name,
        department,
      });


      setName('');
      setDepartment('');
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
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
  );
};

export default AddEmployee;
