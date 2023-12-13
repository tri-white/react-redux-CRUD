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
        console.error('Error fetching expense types:', error);
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
      console.error('Error adding expense type:', error);
    }
  };

  const handleDeleteExpenseType = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/expense-types/${id}`);
      dispatch(deleteExpenseType(id));
    } catch (error) {
      console.error('Error deleting expense type:', error);
    }
  };
  const handleUpdateClick = (id) => {
    navigate(`/expense-types/update/${id}`);
  };
  

  const renderList = expenseTypes.map((expenseType)=>{
    const {_id, name, description, limit} = expenseType;
    return (
    <tr>
    <td>{_id}</td>
    <td>{name}</td>
    <td>{description}</td>
    <td>{limit}</td>
    <td>
    <button className="btn btn-primary" onClick={() => handleUpdateClick(_id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteExpenseType(_id)}>Delete</button>
        </td>
    </tr>
        
    );
})


  return (
    <div>
      <h2>Expense Types</h2>
      <div className="expense-types-list">
      <div>
      <h2>Add Expense Type</h2>
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
        <button type="button" className="btn btn-primary" onClick={handleAddExpenseType}>
          Add Expense Type
        </button>
      </form>
    </div>
        <h3>Expense Types List</h3>

        <table className="table">
        <thead>
            <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Limit</th>
                <th>Action</th>
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
