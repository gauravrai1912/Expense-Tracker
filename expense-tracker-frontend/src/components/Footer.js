import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
