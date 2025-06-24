import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeAppBar = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.appBar}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        POLICY INSURANCE COMPANY
      </div>
      <nav style={styles.nav}>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/plans')}
        >
          Insurance Plans
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/about')}
        >
          About Us
        </button>
        <button 
          style={styles.navButton}
          onClick={() => navigate('/contact')}
        >
          Contact
        </button>
        <button 
          style={styles.signupButton}
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

const styles = {
  appBar: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'white',
    letterSpacing: '0.5px'
  },
  nav: {
    display: 'flex',
    gap: '15px',
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
  loginButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
    marginLeft: '10px',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  },
  signupButton: {
    backgroundColor: '#fbbf24',
    color: '#000000',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#f59e0b'
    }
  }
};

export default HomeAppBar;