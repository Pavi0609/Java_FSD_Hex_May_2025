import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerAppBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (clearing tokens, etc.)
    navigate('/'); // Redirect to home page
  };

  return (
    <header style={styles.appBar}>
      <div style={styles.logo} onClick={() => navigate('/dashboard')}>
        POLICY INSURANCE COMPANY 
      </div>
      <nav style={styles.nav}>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/customerDashboard')}
        >
          Dashboard
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/customerProfile')}
        >
          Profile
        </button>
        <button 
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

const styles = {
  appBar: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'white', // Keeping your original brand color
    letterSpacing: '0.5px'
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  navButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#34495e'
    }
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  }
};

export default CustomerAppBar;