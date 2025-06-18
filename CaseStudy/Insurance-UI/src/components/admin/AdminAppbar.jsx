import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAppBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (clearing tokens, etc.)
    navigate('/'); // Redirect to home page
  };

  return (
    <header style={styles.appBar}>
      <div style={styles.logo}>INSURANCE MANAGEMENT SYSTEM</div>
      <nav style={styles.nav}>
        <a href="/admin" style={styles.navLink}>Dashboard</a>
        <a href="/policies" style={styles.navLink}>Policies</a>
        <a href="/addPolicy" style={styles.navLink}>Add Policy</a>
        <a href="#settings" style={styles.navLink}>Settings</a>
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

// Style.CSS
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
    fontWeight: 'bold'
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '4px',
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

export default AdminAppBar;