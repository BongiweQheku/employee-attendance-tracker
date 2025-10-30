import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const styles = {
    navbar: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '700',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    brandHover: {
      transform: 'scale(1.05)'
    },
    icon: {
      fontSize: '2rem'
    },
    navLinks: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    navLink: {
      textDecoration: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden'
    },
    navLinkActive: {
      background: 'rgba(255, 255, 255, 0.25)',
      fontWeight: '600'
    },
    navLinkHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-2px)'
    },
    linkIcon: {
      fontSize: '1.2rem'
    },
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      },
      navLinks: {
        flexDirection: 'column',
        width: '100%'
      },
      navLink: {
        width: '100%'
      }
    }
  };

  const [brandHovered, setBrandHovered] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link 
          to="/" 
          style={{
            ...styles.brand,
            ...(brandHovered ? styles.brandHover : {})
          }}
          onMouseEnter={() => setBrandHovered(true)}
          onMouseLeave={() => setBrandHovered(false)}
        >
          <span style={styles.icon}></span>
          <span>Employee Attendance Tracker</span>
        </Link>
        
        <div style={styles.navLinks}>
          <Link 
            to="/form" 
            style={{
              ...styles.navLink,
              ...(isActive('/form') ? styles.navLinkActive : {}),
              ...(hoveredLink === 'form' ? styles.navLinkHover : {})
            }}
            onMouseEnter={() => setHoveredLink('form')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <span style={styles.linkIcon}></span>
            <span>Record Attendance</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            style={{
              ...styles.navLink,
              ...(isActive('/dashboard') ? styles.navLinkActive : {}),
              ...(hoveredLink === 'dashboard' ? styles.navLinkHover : {})
            }}
            onMouseEnter={() => setHoveredLink('dashboard')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <span style={styles.linkIcon}></span>
            <span> Attendance Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;