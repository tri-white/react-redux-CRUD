// UpdateEmployeeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setEmployees } from '../../redux/actions/employeeActions';
const UpdateEmployee = ({ onClose }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const dispatch = useDispatch();
    const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/employees/${id}`);
        const { name, department } = response.data;
        setName(name);
        setDepartment(department);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(`http://localhost:3001/api/employees/${id}`, {
        name,
        department,
      });

      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  const handleFormClose = () =>{
    navigate('/employees');
  }
  return (
    <div className="update-employee-form">
      <h2>Update Employee</h2>
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
        <button type="button" className="btn btn-primary" onClick={handleUpdateEmployee}>
          Update Employee
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
