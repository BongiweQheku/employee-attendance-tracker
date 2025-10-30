import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendance(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching attendance data');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/attendance/${id}`);
        setAttendance(attendance.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Error deleting attendance record');
      }
    }
  };

  // Filter attendance based on date and search term
  const filteredAttendance = attendance.filter(record => {
    const matchesDate = filterDate ? record.date === filterDate : true;
    const matchesSearch = searchTerm ? 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeID.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    
    return matchesDate && matchesSearch;
  });

  const calculateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendance.filter(record => record.date === today);
    const presentToday = todayRecords.filter(record => record.status === 'Present').length;
    
    return {
      totalRecords: attendance.length,
      presentToday,
      absentToday: todayRecords.length - presentToday
    };
  };

  const stats = calculateStats();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Attendance Dashboard</h2>
      
      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Records</h5>
              <h2 className="card-text">{stats.totalRecords}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Present Today</h5>
              <h2 className="card-text">{stats.presentToday}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Absent Today</h5>
              <h2 className="card-text">{stats.absentToday}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="filterDate" className="form-label">Filter by Date</label>
          <input
            type="date"
            className="form-control"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="searchTerm" className="form-label">Search by Name or ID</label>
          <input
            type="text"
            className="form-control"
            id="searchTerm"
            placeholder="Enter name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Attendance List */}
      <div className="attendance-list">
        <h3>Attendance Records ({filteredAttendance.length})</h3>
        {filteredAttendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          filteredAttendance.map((record) => (
            <div key={record.id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">{record.employeeName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">ID: {record.employeeID}</h6>
                  </div>
                  <div>
                    <span className={`badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                      {record.status}
                    </span>
                    <button 
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="card-text">Date: {record.date}</p>
                <small className="text-muted">
                  Recorded on: {new Date(record.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;