import './App.css';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
import Header from './containers/Header'
import EmployeeList from './containers/EmployeeList';
import UpdateEmployee from './containers/UPDATE/UpdateEmployee';
import DepartmentList from './containers/DepartmentList';
import UpdateDepartment from './containers/UPDATE/UpdateDepartment';
function App() {
  return (
    <div className='App'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/update/:id" element={<UpdateEmployee />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/update/:id" element={<UpdateDepartment/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
