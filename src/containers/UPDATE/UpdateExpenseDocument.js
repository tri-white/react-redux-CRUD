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
        console.error('Помилка при отриманні деталей документа витрат:', error);
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
      console.error('Помилка при оновленні документа витрат:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/expense-documents');
  };

  return (
    <div className="container mt-4">
      <h2>Оновити документ витрат</h2>
      <form>
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
        <div className="mb-3">
          <label htmlFor="employee" className="form-label">Працівник:</label>
          <input
            type="text"
            id="employee"
            className="form-control"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expenseType" className="form-label">Тип витрат:</label>
          <input
            type="text"
            id="expenseType"
            className="form-control"
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Дата:</label>
          <input
            type="text"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Сума:</label>
          <input
            type="text"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdateExpenseDocument}>
          Оновити документ витрат
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleFormClose}>
          Скасувати
        </button>
      </form>
    </div>
  );
};

export default UpdateExpenseDocument;
