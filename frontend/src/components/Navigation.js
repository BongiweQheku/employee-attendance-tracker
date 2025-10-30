import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Employee Attendance Tracker</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/form">Record Attendance</Link>
          <Link className="nav-link" to="/dashboard">Attendance Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;