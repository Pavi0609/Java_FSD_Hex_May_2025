import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthAppBar = () => {
  const navigate = useNavigate();
  
  return (
    <header style={styles.appBar}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logoMain}>INSURANCE MANAGEMENT SYSTEM</h1>
        <p style={styles.logoSub}>Automobile Insurance Company</p>
      </div>
      <nav style={styles.nav}>
        <button 
          style={styles.signUpButton}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        <button 
          style={styles.loginButton}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </nav>
    </header>
  );
};

// Style.CSS
const styles = {
  appBar: {
    backgroundColor: '#2c3e50', // Dark blue header
    color: 'white',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  logoMain: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0',
    lineHeight: '1.2'
  },
  logoSub: {
    fontSize: '14px',
    margin: '4px 0 0',
    opacity: '0.9',
    fontWeight: '400'
  },
  nav: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  signUpButton: {
    backgroundColor: '#e74c3c', // Vibrant red
    color: 'white',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#c0392b',
      transform: 'translateY(-2px)'
    }
  },
  loginButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '8px 23px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      transform: 'translateY(-2px)'
    }
  }
};

export default AuthAppBar;