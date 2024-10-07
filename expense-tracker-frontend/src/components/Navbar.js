// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
