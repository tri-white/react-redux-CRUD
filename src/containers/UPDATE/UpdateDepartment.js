// UpdateDepartmentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setDepartments } from '../../redux/actions/departmentsActions';

const UpdateDepartment = ({ onClose }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/departments/${id}`);
        const { name } = response.data;
        setName(name);
      } catch (error) {
        console.error('Error fetching department details:', error);
      }
    };

    fetchDepartmentDetails();
  }, [id]);

  const handleUpdateDepartment = async () => {
    try {
      await axios.put(`http://localhost:3001/api/departments/${id}`, {
        name,
      });

      const response = await axios.get('http://localhost:3001/api/departments/');
      dispatch(setDepartments(response.data));

      navigate('/departments');
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/departments');
  };

  return (
    <div className="update-department-form">
      <h2>Update Department</h2>
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
        <button type="button" className="btn btn-primary" onClick={handleUpdateDepartment}>
          Update Department
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateDepartment;
