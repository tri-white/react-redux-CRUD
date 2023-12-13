import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setExpenseTypes } from '../../redux/actions/expenseTypesActions';

const UpdateExpenseType = ({ onClose }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [limit, setLimit] = useState(0); // Assuming limit should be a number
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseTypeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expense-types/${id}`);
        const { name, description, limit } = response.data;
        setName(name);
        setDescription(description);
        setLimit(limit);
      } catch (error) {
        console.error('Помилка при отриманні деталей типу витрат:', error);
      }
    };

    fetchExpenseTypeDetails();
  }, [id]);

  const handleUpdateExpenseType = async () => {
    try {
      await axios.put(`http://localhost:3001/api/expense-types/${id}`, {
        name,
        description,
        limit,
      });

      const response = await axios.get('http://localhost:3001/api/expense-types/');
      dispatch(setExpenseTypes(response.data));

      navigate('/expense-types');
    } catch (error) {
      console.error('Помилка при оновленні типу витрат:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/expense-types');
  };

  return (
    <div className="update-expense-type-form container mt-4">
      <h2>Оновити тип витрат</h2>
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
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Опис:</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
  <label htmlFor="limit" className="form-label">Ліміт:</label>
  <input
    type="text"
    id="limit"
    className="form-control"
    value={limit}
    onChange={(e) => setLimit(e.target.value.replace(/\D/, ''))}
    inputMode="numeric"
    pattern="[0-9]*"
  />
</div>



        <button type="button" className="btn btn-primary me-2" onClick={handleUpdateExpenseType}>
          Оновити тип витрат
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Скасувати
        </button>
      </form>
    </div>
  );
};

export default UpdateExpenseType;
