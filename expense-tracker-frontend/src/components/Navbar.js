import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // MUI logout icon
import '../styles/Navbar.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    navigate('/');
    console.log('Logout clicked');
  };

  return (
    <nav className="navbar">
      <div className="app-name">
        <Link to="/dashboard">My Expense Tracker</Link>
      </div>
      <ul className="navbar-list">
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/budget">Budget</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
   < div className="logout-button">
       <IconButton  onClick={handleLogout} color="inherit" aria-label="logout">
        <LogoutIcon />
      </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
