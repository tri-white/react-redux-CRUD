// UpdateExpenseTypeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setExpenseTypes } from '../../redux/actions/expenseTypesActions';

const UpdateExpenseType = ({ onClose }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [limit, setLimit] = useState('');
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
        console.error('Error fetching expense type details:', error);
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
      console.error('Error updating expense type:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/expense-types');
  };

  return (
    <div className="update-expense-type-form">
      <h2>Update Expense Type</h2>
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
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="limit">Limit:</label>
          <input
            type="text"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdateExpenseType}>
          Update Expense Type
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateExpenseType;
