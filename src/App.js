import './App.css';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
import Header from './containers/Header'
import EmployeeList from './containers/EmployeeList';
import AddEmployee from './containers/ADD/AddEmployee';
import UpdateEmployee from './containers/UPDATE/UpdateEmployee';
function App() {
  return (
    <div className='App'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/update/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
