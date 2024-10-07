
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (

    <div className="app-container">
      <Navbar />
      <h1>This is the Dashboard Page</h1>
      <Footer />
    </div>

  );
};

export default Dashboard;
