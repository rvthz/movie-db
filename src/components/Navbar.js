import React, { useState, useEffect } from 'react';
import { Link, NavLink, useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`http://localhost:3001/api/user/logout/${userId}`);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      setIsCollapsed(true);
      navigate('/signin');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{paddingLeft: '15%', paddingRight: '15%'}}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Baza filmów
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <CustomLink to="/">Filmy</CustomLink>
              <CustomLink to="/addmovie">Dodaj film</CustomLink>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>Wyloguj się</button>
                  </li>
                </>
              ) : (
                <>
                  <CustomLink to="/signin">Zaloguj się</CustomLink>
                  <CustomLink to="/signup">Zarejestruj się</CustomLink>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const match = useMatch(to);
  const isActive = match ? match.isExact : false;

  return (
    <li className="nav-item">
      <NavLink to={to} className={`nav-link ${isActive ? 'active' : ''}`} {...props}>
        {children}
      </NavLink>
    </li>
  );
}
