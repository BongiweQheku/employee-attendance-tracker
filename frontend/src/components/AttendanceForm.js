import React, { useState } from 'react';
import axios from 'axios';



const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeID: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required';
    }
    
    if (!formData.employeeID.trim()) {
      newErrors.employeeID = 'Employee ID is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Form data before submission:', formData);
      
      // Ensure date is in correct format
      const submissionData = {
        employeeName: formData.employeeName.trim(),
        employeeID: formData.employeeID.trim(),
        date: formData.date, // Should already be YYYY-MM-DD from input type="date"
        status: formData.status
      };

      console.log('Data being sent to backend:', submissionData);

      const response = await axios.post('/api/attendance', submissionData);
      console.log('Backend response:', response.data);
      
      setMessage('Attendance recorded successfully!');
      setFormData({
        employeeName: '',
        employeeID: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="attendance-form">
      <h2>Record Employee Attendance</h2>
      
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employeeName" className="form-label">Employee Name</label>
          <input
            type="text"
            className={`form-control ${errors.employeeName ? 'is-invalid' : ''}`}
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Enter employee name"
          />
          {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="employeeID" className="form-label">Employee ID</label>
          <input
            type="text"
            className={`form-control ${errors.employeeID ? 'is-invalid' : ''}`}
            id="employeeID"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            placeholder="Enter employee ID"
          />
          {errors.employeeID && <div className="invalid-feedback">{errors.employeeID}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Attendance Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Record Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceForm;