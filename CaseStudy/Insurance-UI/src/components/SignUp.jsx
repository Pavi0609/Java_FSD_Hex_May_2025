import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/user/signup', {
        username: formData.username,
        password: formData.password,
        role: formData.role
      });

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.signupContainer}>
        <div style={styles.signupCard}>
          <h1 style={styles.signupHeader}>CREATE ACCOUNT</h1>
          
          {success && (
            <div style={styles.successAlert}>
              Account created successfully! Redirecting to login...
            </div>
          )}
          
          {error && (
            <div style={styles.errorAlert}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <h2 style={styles.label}>Username</h2>
              <input
                type="email"
                name="username"
                style={styles.input}
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div style={styles.formGroup}>
              <h2 style={styles.label}>Password</h2>
              <input
                type="password"
                name="password"
                style={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
                minLength="20"
                placeholder="Create a password"
              />
              <small style={styles.hintText}>Minimum 20 characters</small>
            </div>

            <div style={styles.formGroup}>
              <h2 style={styles.label}>User Role</h2>
              <select
                name="role"
                style={styles.input}
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={styles.signupButton}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'SIGN UP'}
            </button>
          </form>

          <div style={styles.loginPrompt}>
            Already have an account?
            <button 
              style={styles.loginLink}
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Style.CSS
const styles = {
  pageContainer: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    margin: 0
  },
  signupContainer: {
    width: '100%',
    maxWidth: '500px'
  },
  signupCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%'
  },
  signupHeader: {
    color: '#2c3e50',
    fontSize: '24px',
    marginBottom: '30px',
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '25px'
  },
  label: {
    color: '#2c3e50',
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px'
  },
  hintText: {
    color: '#7f8c8d',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block'
  },
  signupButton: {
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '6px',
    width: '100%',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1a2634'
    },
    ':disabled': {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed'
    }
  },
  successAlert: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '25px',
    textAlign: 'center'
  },
  errorAlert: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '25px',
    textAlign: 'center'
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#7f8c8d'
  },
  loginLink: {
    backgroundColor: 'transparent',
    color: '#e74c3c',
    border: 'none',
    padding: '0 5px',
    fontSize: 'inherit',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    ':hover': {
      color: '#c0392b'
    }
  }
};

export default Signup;