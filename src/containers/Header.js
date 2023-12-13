import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand fs-3">ReduxApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/employees" className="nav-link fs-5">Працівники</Link>
              <Link to="/departments" className="nav-link fs-5">Департаменти</Link>
              <Link to="/expense-types" className="nav-link fs-5">Типи витрат</Link>
              <Link to="/expense-documents" className="nav-link fs-5">Документи витрат</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
