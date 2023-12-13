import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './containers/Header';
import EmployeeList from './containers/EmployeeList';
import UpdateEmployee from './containers/UPDATE/UpdateEmployee';
import DepartmentList from './containers/DepartmentList';
import UpdateDepartment from './containers/UPDATE/UpdateDepartment';
import ExpenseTypesList from './containers/ExpenseTypesList';
import UpdateExpenseType from './containers/UPDATE/UpdateExpenseType';
import ExpenseDocumentList from './containers/expenseDocumentList';
import UpdateExpenseDocument from './containers/UPDATE/UpdateExpenseDocument';

const WelcomePage = () => (
  <div className="container mt-5 bg-success text-light p-3 py-5">
    <h1 className="display-4">Це CRUD з використанням MERN стеку (або ні? я не знаю)</h1>
    <p className="lead">Це перша сторінка, тут мала б бути цікава інформація в гарній обгортці</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/update/:id" element={<UpdateEmployee />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/update/:id" element={<UpdateDepartment />} />
          <Route path="/expense-types" element={<ExpenseTypesList />} />
          <Route path="/expense-types/update/:id" element={<UpdateExpenseType />} />
          <Route path="/expense-documents" element={<ExpenseDocumentList />} />
          <Route path="/expense-documents/update/:id" element={<UpdateExpenseDocument />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
