import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setEmployees } from '../../redux/actions/employeeActions';

const UpdateEmployee = ({ onClose }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]); // Added state for departments
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

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/departments/");
        setDepartments(response.data);
      } catch (err) {
        console.log("Error fetching departments:", err);
      }
    };

    fetchEmployeeDetails();
    fetchDepartments(); // Fetch departments on component mount
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

  const handleFormClose = () => {
    navigate('/employees');
  };

  return (
    <div className="update-employee-form container mt-4">
      <h2 className="mb-3">Оновити інформацію про працівника</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Ім'я:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Департамент:
          </label>
          <select
            id="department"
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Виберіть департамент</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={handleUpdateEmployee}>
          Оновити інформацію
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Відміна
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
