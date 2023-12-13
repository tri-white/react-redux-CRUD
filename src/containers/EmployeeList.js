import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteEmployee, setEmployees, addEmployee } from '../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/employees/");
      dispatch(setEmployees(response.data));
    } catch (err) {
      console.log("Помилка", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`);
      dispatch(deleteEmployee(id));
    } catch (error) {
      console.error('Помилка при видаленні працівника:', error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/employees/update/${id}`);
  };

  const employees2 = useSelector((state) => state.allEmployees.employees);
  const renderList = employees2.map((employee) => {
    const { _id, name, department } = employee;
    return (
      <tr key={_id} className="table-row">
      <td>{_id}</td>
      <td>{name}</td>
      <td>{department}</td>
      <td>
        <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdateClick(_id)}>
          Редагувати
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(_id)}>
          Видалити
        </button>
      </td>
    </tr>
    
    );
  });

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
      console.error('Помилка при додаванні працівника:', error);
    }
  };

  return (
    <div className="container mt-4">
    <h2 className="mb-3">Додати працівника</h2>
    <form className="mb-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Ім'я:</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">Департамент:</label>
        <input
          type="text"
          id="department"
          className="form-control"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>
        Додати працівника
      </button>
    </form>
  
    <h2 className="mb-3">Список працівників</h2>
  
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ім'я</th>
          <th>Департамент</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>{renderList}</tbody>
    </table>
  </div>
  
  );
};

export default EmployeeList;
