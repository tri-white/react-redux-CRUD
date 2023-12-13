import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setExpenseDocuments } from '../../redux/actions/expenseDocumentActions';

const UpdateExpenseDocument = ({ onClose }) => {
  const { id } = useParams();
  const [department, setDepartment] = useState('');
  const [employee, setEmployee] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseDocumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expense-documents/${id}`);
        const { department, employee, expenseType, date, amount } = response.data;
        setDepartment(department);
        setEmployee(employee);
        setExpenseType(expenseType);
        setDate(date);
        setAmount(amount);
      } catch (error) {
        console.error('Error fetching expense document details:', error);
      }
    };

    fetchExpenseDocumentDetails();
  }, [id]);

  const handleUpdateExpenseDocument = async () => {
    try {
      await axios.put(`http://localhost:3001/api/expense-documents/${id}`, {
        department,
        employee,
        expenseType,
        date,
        amount,
      });

      const response = await axios.get('http://localhost:3001/api/expense-documents/');
      dispatch(setExpenseDocuments(response.data));

      navigate('/expense-documents');
    } catch (error) {
      console.error('Error updating expense document:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/expense-documents');
  };

  return (
    <div className="update-expense-document-form">
      <h2>Update Expense Document</h2>
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
        <button type="button" className="btn btn-primary" onClick={handleUpdateExpenseDocument}>
          Update Expense Document
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateExpenseDocument;
