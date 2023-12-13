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
        console.error('Помилка при отриманні документів витрат:', error);
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
      console.error('Помилка при додаванні документа витрат:', error);
    }
  };

  const handleDeleteExpenseDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/expense-documents/${id}`);
      dispatch(deleteExpenseDocument(id));

    } catch (error) {
      console.error('Помилка при видаленні документа витрат:', error);
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
          <button className="btn btn-primary me-2" onClick={() => handleUpdateClick(_id)}>Редагувати</button>
          <button className="btn btn-danger" onClick={() => handleDeleteExpenseDocument(_id)}>Видалити</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-4">
      <h2>Документи витрат</h2>
      <div className="expense-document-list">
        <div>
          <h2>Додати документ витрат</h2>
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
    type="date"
    id="date"
    className="form-control"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    pattern="\d{2}/\d{2}/\d{4}"
    placeholder="MM/dd/YYYY"
  />
</div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Сума:</label>
              <input
                type="text"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/, ''))}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddExpenseDocument}>
              Додати документ витрат
            </button>
          </form>
        </div>
        <h3>Список документів витрат</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Департамент</th>
              <th>Працівник</th>
              <th>Тип витрат</th>
              <th>Дата</th>
              <th>Сума</th>
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

export default ExpenseDocumentList;
