import React from 'react';
import AuthAppBar from './AuthAppBar';

const Home = () => {
  return (
    <div style={styles.container}>
      <AuthAppBar />
      <div style={styles.content}>
        <div style={styles.companyHeader}>
          <h1 style={styles.companyName}>Automobile Insurance Company</h1>
        </div>
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeTitle}>Welcome to Our Insurance Portal</h2>
          <p style={styles.welcomeText}>
            Get the best automobile insurance coverage tailored to your needs!!!
          </p>
        </div>
      </div>
    </div>
  );
};

// Style.CSS
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    textAlign: 'center'
  },
  companyHeader: {
    marginBottom: '30px',
    padding: '20px 0'
  },
  companyName: {
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: '600',
    margin: '0'
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '100%'
  },
  welcomeTitle: {
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '15px'
  },
  welcomeText: {
    color: '#7f8c8d',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0'
  }
};

export default Home;