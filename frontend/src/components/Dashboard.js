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
      const response = await axios.get('/api/attendance');
      setAttendance(response.data.data); // FIXED: Set the attendance data
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
        await axios.delete(`/api/attendance/${id}`);
        setAttendance(attendance.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Error deleting attendance record');
      }
    }
  };

  const calculateStats = () => {
    const totalPresent = attendance.filter(record => record.status === 'Present').length;
    const totalAbsent = attendance.filter(record => record.status === 'Absent').length;
    
    return {
      totalRecords: attendance.length,
      totalPresent,
      totalAbsent,
      attendanceRate: attendance.length > 0 ? Math.round((totalPresent / attendance.length) * 100) : 0
    };
  };

  const filteredAttendance = attendance.filter(record => {
    const matchesDate = filterDate ? record.date === filterDate : true;
    const matchesSearch = searchTerm ? 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeID.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    
    return matchesDate && matchesSearch;
  });

  const stats = calculateStats();

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#f7fafc',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    dashboard: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'transparent',
      padding: '0'
    },
    header: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '40px',
      textAlign: 'center'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    statCard: {
      padding: '30px',
      borderRadius: '15px',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    },
    statCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)'
    },
    statTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      opacity: '0.9',
      marginBottom: '10px'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '0'
    },
    filterSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
      padding: '30px',
      background: '#f7fafc',
      borderRadius: '15px',
      border: '2px solid #e2e8f0'
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '2px solid #e2e8f0',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    recordsHeader: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    recordsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    recordCard: {
      background: 'white',
      borderRadius: '8px',
      padding: '24px',
      borderLeft: '4px solid #667eea',
      border: '1px solid #e2e8f0',
      borderLeftWidth: '4px',
      borderLeftColor: '#667eea',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    recordCardHover: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    recordHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    employeeName: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '8px'
    },
    employeeId: {
      fontSize: '0.9rem',
      color: '#718096',
      marginTop: '4px'
    },
    badgeContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    badge: {
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    badgePresent: {
      background: '#10b981',
      color: 'white'
    },
    badgeAbsent: {
      background: '#ef4444',
      color: 'white'
    },
    deleteBtn: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: '2px solid #fecaca',
      background: 'white',
      color: '#ef4444',
      fontSize: '1.1rem',
      fontWeight: '400',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    recordDate: {
      fontSize: '0.95rem',
      color: '#6b7280',
      marginTop: '12px',
      fontWeight: '400'
    },
    recordTimestamp: {
      fontSize: '0.85rem',
      color: '#9ca3af',
      marginTop: '4px'
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.5rem',
      color: '#4a5568',
      padding: '60px'
    },
    error: {
      background: '#fed7d7',
      color: '#c53030',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      fontWeight: '500'
    },
    noRecords: {
      textAlign: 'center',
      padding: '60px',
      color: '#718096',
      fontSize: '1.1rem'
    }
  };

  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  if (loading) return (
    <div style={styles.container}>
      <div style={styles.loading}>Loading...</div>
    </div>
  );

  if (error) return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <div style={styles.error}>{error}</div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <h2 style={styles.header}>Attendance Dashboard</h2>
        
        <div style={styles.statsGrid}>
          <div 
            style={{
              ...styles.statCard,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              ...(hoveredStat === 0 ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredStat(0)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={styles.statTitle}>Total Records</div>
            <h2 style={styles.statValue}>{stats.totalRecords}</h2>
          </div>
          <div 
            style={{
              ...styles.statCard,
              background: 'linear-gradient(135deg, #a19edfff 0%, #3c3a8dff 100%)',
              ...(hoveredStat === 1 ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredStat(1)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={styles.statTitle}>Total Present</div>
            <h2 style={styles.statValue}>{stats.totalPresent}</h2>
          </div>
          <div 
            style={{
              ...styles.statCard,
              background: 'linear-gradient(135deg, #9dbae1ff, rgba(29, 48, 94, 1) 100%)',
              ...(hoveredStat === 2 ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredStat(2)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={styles.statTitle}>Total Absent</div>
            <h2 style={styles.statValue}>{stats.totalAbsent}</h2>
          </div>
          <div 
            style={{
              ...styles.statCard,
              background: 'linear-gradient(135deg, #93b6d3ff 0%, #0b2a47ff 100%)',
              ...(hoveredStat === 3 ? styles.statCardHover : {})
            }}
            onMouseEnter={() => setHoveredStat(3)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={styles.statTitle}>Attendance Rate</div>
            <h2 style={styles.statValue}>{stats.attendanceRate}%</h2>
          </div>
        </div>

        <div style={styles.filterSection}>
          <div>
            <label style={styles.label} htmlFor="filterDate">Filter by Date</label>
            <input
              type="date"
              style={styles.input}
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div>
            <label style={styles.label} htmlFor="searchTerm">Search by Name or ID</label>
            <input
              type="text"
              style={styles.input}
              id="searchTerm"
              placeholder="Enter name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        <div>
          <div style={styles.recordsHeader}>
            <span>Attendance Records</span>
            <span style={{ fontSize: '1rem', color: '#667eea' }}>({filteredAttendance.length})</span>
          </div>
          {filteredAttendance.length === 0 ? (
            <div style={styles.noRecords}>No attendance records found.</div>
          ) : (
            <div style={styles.recordsGrid}>
              {filteredAttendance.map((record) => (
                <div 
                  key={record.id} 
                  style={{
                    ...styles.recordCard,
                    ...(hoveredCard === record.id ? styles.recordCardHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(record.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.recordHeader}>
                    <div>
                      <div style={styles.employeeName}>{record.employeeName}</div>
                      <div style={styles.employeeId}>ID: {record.employeeID || record.id}</div>
                    </div>
                    <div style={styles.badgeContainer}>
                      <span style={{
                        ...styles.badge,
                        ...(record.status === 'Present' ? styles.badgePresent : styles.badgeAbsent)
                      }}>
                        {record.status}
                      </span>
                      <button 
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(record.id)}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#fee2e2';
                          e.target.style.borderColor = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.borderColor = '#fecaca';
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div style={styles.recordDate}>Date: {record.date}</div>
                  <div style={styles.recordTimestamp}>
                    Recorded on: {new Date(record.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;