import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setExpenseDocuments } from '../../redux/actions/expenseDocumentActions';

const UpdateExpenseDocument = ({ onClose }) => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedExpenseType, setSelectedExpenseType] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseDocumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expense-documents/${id}`);
        const { department, employee, expenseType, date, amount } = response.data;
        setSelectedDepartment(department);
        setSelectedEmployee(employee);
        setSelectedExpenseType(expenseType);
        setDate(date);
        setAmount(amount);
      } catch (error) {
        console.error('Error fetching expense document details:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchExpenseTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expense-types/');
        setExpenseTypes(response.data);
      } catch (error) {
        console.error('Error fetching expense types:', error);
      }
    };

    fetchExpenseDocumentDetails();
    fetchDepartments();
    fetchEmployees();
    fetchExpenseTypes();
  }, [id]);

  const handleUpdateExpenseDocument = async () => {
    try {
      await axios.put(`http://localhost:3001/api/expense-documents/${id}`, {
        department: selectedDepartment,
        employee: selectedEmployee,
        expenseType: selectedExpenseType,
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
    <div className="container mt-4">
      <h2>Оновити документ витрат</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Департамент:</label>
          <select
            id="department"
            className="form-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Виберіть департамент</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="employee" className="form-label">Працівник:</label>
          <select
            id="employee"
            className="form-select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Виберіть працівника</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="expenseType" className="form-label">Тип витрат:</label>
          <select
            id="expenseType"
            className="form-select"
            value={selectedExpenseType}
            onChange={(e) => setSelectedExpenseType(e.target.value)}
          >
            <option value="">Виберіть тип витрат</option>
            {expenseTypes.map((expenseType) => (
              <option key={expenseType._id} value={expenseType._id}>
                {expenseType.name}
              </option>
            ))}
          </select>
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