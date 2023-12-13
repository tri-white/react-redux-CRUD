// components/ExpenseDocumentList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setExpenseDocuments, deleteExpenseDocument, addExpenseDocument } from '../redux/actions/expenseDocumentActions';
import { useNavigate } from 'react-router-dom';

const ExpenseDocumentList = () => {
  const dispatch = useDispatch();
  const expenseDocuments = useSelector((state) => state.allExpenseDocuments.expenseDocuments);
  const [department, setDepartment] = useState('');
  const [employee, setEmployee] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expense-documents/');
        dispatch(setExpenseDocuments(response.data));
      } catch (error) {
        console.error('Error fetching expense documents:', error);
      }
    };

    fetchExpenseDocuments();
  }, [dispatch]);

  const handleAddExpenseDocument = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/expense-documents/', {
        department,
        employee,
        expenseType,
        date,
        amount,
      });

      dispatch(addExpenseDocument(response.data));
      navigate('/expense-documents');

    } catch (error) {
      console.error('Error adding expense document:', error);
    }
  };

  const handleDeleteExpenseDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/expense-documents/${id}`);
      dispatch(deleteExpenseDocument(id));

    } catch (error) {
      console.error('Error deleting expense document:', error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/expense-documents/update/${id}`);
  };

  const renderList = expenseDocuments.map((expenseDocument) => {
    const { _id, department, employee, expenseType, date, amount } = expenseDocument;
    return (
      <tr key={_id}>
        <td>{_id}</td>
        <td>{department}</td>
        <td>{employee}</td>
        <td>{expenseType}</td>
        <td>{date}</td>
        <td>{amount}</td>
        <td>
          <button className="btn btn-primary" onClick={() => handleUpdateClick(_id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeleteExpenseDocument(_id)}>Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Expense Documents</h2>
      <div className="expense-document-list">
        <div>
          <h2>Add Expense Document</h2>
          <form>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee">Employee:</label>
              <input
                type="text"
                id="employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expenseType">Expense Type:</label>
              <input
                type="text"
                id="expenseType"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="text"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddExpenseDocument}>
              Add Expense Document
            </button>
          </form>
        </div>
        <h3>Expense Documents List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Employee</th>
              <th>Expense Type</th>
              <th>Date</th>
              <th>Amount</th>
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

export default ExpenseDocumentList;
