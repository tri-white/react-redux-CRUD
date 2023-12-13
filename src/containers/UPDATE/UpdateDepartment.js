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
        console.error('Помилка при отриманні деталей департаменту:', error);
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
      console.error('Помилка при оновленні департаменту:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/departments');
  };

  return (
    <div className="update-department-form container mt-4">
      <h2>Оновити інформацію про департамент</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Назва:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={handleUpdateDepartment}>
          Оновити департамент
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Відміна
        </button>
      </form>
    </div>
  );
};

export default UpdateDepartment;
