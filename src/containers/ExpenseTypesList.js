import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setExpenseTypes, deleteExpenseType, addExpenseType } from '../redux/actions/expenseTypesActions';
import { useNavigate } from 'react-router-dom';

const ExpenseTypesList = () => {
  const dispatch = useDispatch();
  const expenseTypes = useSelector((state) => state.allExpenseTypes.expenseTypes);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [limit, setLimit] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expense-types/');
        dispatch(setExpenseTypes(response.data));
      } catch (error) {
        console.error('Помилка при отриманні типів витрат:', error);
      }
    };

    fetchExpenseTypes();
  }, [dispatch]);

  const handleAddExpenseType = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/expense-types/', {
        name,
        description,
        limit,
      });

      dispatch(addExpenseType(response.data));
      navigate('/expense-types');

    } catch (error) {
      console.error('Помилка при додаванні типу витрат:', error);
    }
  };

  const handleDeleteExpenseType = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/expense-types/${id}`);
      dispatch(deleteExpenseType(id));
    } catch (error) {
      console.error('Помилка при видаленні типу витрат:', error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/expense-types/update/${id}`);
  };

  const renderList = expenseTypes.map((expenseType) => {
    const { _id, name, description, limit } = expenseType;
    return (
      <tr key={_id}>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{limit}</td>
        <td>
          <button className="btn btn-primary me-2" onClick={() => handleUpdateClick(_id)}>
            Редагувати
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteExpenseType(_id)}>
            Видалити
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="expense-types-list container mt-4">
      <h2>Типи витрат</h2>

        <div>
          <h2>Додати тип витрат</h2>
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


            <button type="button" className="btn btn-primary" onClick={handleAddExpenseType}>
              Додати тип витрат
            </button>
          </form>
        </div>
        <h3>Список типів витрат</h3>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Опис</th>
              <th>Ліміт</th>
              <th>Дії</th>
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

export default ExpenseTypesList;
