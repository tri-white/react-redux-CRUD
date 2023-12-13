import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDepartments, addDepartment, deleteDepartment } from '../redux/actions/departmentsActions';
import { useNavigate } from 'react-router-dom';

const DepartmentList = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.allDepartments.departments);
  const navigate = useNavigate();
  const [newDepartmentName, setNewDepartmentName] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/departments/');
        dispatch(setDepartments(response.data));
      } catch (error) {
        console.error('Помилка при отриманні департаментів:', error);
      }
    };

    fetchDepartments();
  }, [dispatch]);

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/departments/', { name: newDepartmentName });
      dispatch(addDepartment(response.data));
      setNewDepartmentName('');
    } catch (error) {
      console.error('Помилка при додаванні департаменту:', error);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/departments/${id}`);
      dispatch(deleteDepartment(id));
    } catch (error) {
      console.error('Помилка при видаленні департаменту:', error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/departments/update/${id}`);
  };

  const renderList = departments.map((department) => (
    <tr key={department._id}>
      <td>{department._id}</td>
      <td>{department.name}</td>
      <td>
        <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdateClick(department._id)}>
          Редагувати
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDepartment(department._id)}>
          Видалити
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-4">
      <h2>Департаменти</h2>

      <div className="mb-3">
        <h3>Додати департамент</h3>
        <div className="input-group">
          <input
            type="text"
            id="departmentName"
            className="form-control"
            placeholder="Назва департаменту"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddDepartment}>
            Додати департамент
          </button>
        </div>
      </div>

      <div>
        <h3>Список департаментів</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва департаменту</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
