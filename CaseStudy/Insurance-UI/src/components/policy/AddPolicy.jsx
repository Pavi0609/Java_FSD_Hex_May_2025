import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPolicy } from '../../store/actions/AddPolicyAction';
import AdminAppBar from '../admin/AdminAppbar';

function AddPolicy() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const { loading, success, error } = useSelector(state => state.policy);
  
  const [formData, setFormData] = useState({
    policyName: '',
    premiumAmount: '',
    policyStatus: 'ACTIVE',
    startDate: '',
    endDate: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.policyName.trim()) {
      newErrors.policyName = 'Policy name is required';
    }
    
    if (!formData.premiumAmount || isNaN(formData.premiumAmount)) {
      newErrors.premiumAmount = 'Valid premium amount is required';
    } else if (parseFloat(formData.premiumAmount) <= 0) {
      newErrors.premiumAmount = 'Premium must be greater than 0';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      await dispatch(addPolicy(formData, token));
      
      // Reset form after successful submission
      setFormData({
        policyName: '',
        premiumAmount: '',
        policyStatus: 'ACTIVE',
        startDate: '',
        endDate: ''
      });
      
    } catch (error) {
      console.error('Error adding policy:', error);
    }
  };

  // Redirect on success
  useEffect(() => {

    if (success) {
      const timer = setTimeout(() => {
        navigate('/policies');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div>       
      <AdminAppBar />
      <div style={styles.container}>
        <h1 style={styles.header}>Add New Policy</h1>
        
        {success && (
          <div style={styles.successMessage}>
            Policy added successfully! Redirecting...
          </div>
        )}
        
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="policyName" style={styles.label}>
              Policy Name*
            </label>
            <input
              type="text"
              id="policyName"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter policy name"/>
            {errors.policyName && (
              <span style={styles.errorText}>{errors.policyName}</span>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="premiumAmount" style={styles.label}>
              Premium Amount (₹)*
            </label>
            <input
              type="number"
              id="premiumAmount"
              name="premiumAmount"
              value={formData.premiumAmount}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter premium amount"
              step="0.01"
              min="0"/>
            {errors.premiumAmount && (
              <span style={styles.errorText}>{errors.premiumAmount}</span>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="policyStatus" style={styles.label}>
              Policy Status*
            </label>
            <select
              id="policyStatus"
              name="policyStatus"
              value={formData.policyStatus}
              onChange={handleChange}
              style={styles.select}>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="startDate" style={styles.label}>
              Start Date*
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              style={styles.input}/>
            {errors.startDate && (
              <span style={styles.errorText}>{errors.startDate}</span>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="endDate" style={styles.label}>
              End Date*
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              style={styles.input}/>
            {errors.endDate && (
              <span style={styles.errorText}>{errors.endDate}</span>
            )}
          </div>
          
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}>
              {loading ? 'Adding...' : 'Add Policy'}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate('/policy')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Style.CSS 
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: '600',
    color: '#333'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: 'white'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: 1
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: 1
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '5px'
  },
  errorMessage: {
    backgroundColor: '#fdecea',
    color: '#e74c3c',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  successMessage: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center'
  }
};

export default AddPolicy;