import React, { useState } from 'react';

export const AddPolicyAddOns = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    policyId: '',
    addonName: '',
    description: '',
    additionalPremium: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      if (!formData.policyId) {
        throw new Error('Policy ID is required');
      }
      const response = await fetch(`http://localhost:8080/api/policy-addons/add/policy/${formData.policyId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({
            addonName: formData.addonName,
            description: formData.description,
            additionalPremium: parseFloat(formData.additionalPremium) || 0
          })
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add policy add-on');
      }
      setSuccess('Policy add-on added successfully!');
      // Reset form but keep policy ID
      setFormData(prev => ({
        policyId: prev.policyId,
        addonName: '',
        description: '',
        additionalPremium: ''
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      color: '#333',
      marginBottom: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#444'
    },
    input: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px'
    },
    textarea: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      minHeight: '100px',
      resize: 'vertical'
    },
    submitButton: {
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      alignSelf: 'flex-start'
    },
    submitButtonHover: {
      backgroundColor: '#45a049'
    },
    submitButtonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    errorMessage: {
      color: '#d32f2f',
      backgroundColor: '#fde0e0',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px'
    },
    successMessage: {
      color: '#388e3c',
      backgroundColor: '#e8f5e9',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Policy Add-On</h2>
      
      {error && <div style={styles.errorMessage}>{error}</div>}
      {success && <div style={styles.successMessage}>{success}</div>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="policyId" style={styles.label}> Policy ID: </label>
          <input
            type="text"
            id="policyId"
            name="policyId"
            value={formData.policyId}
            onChange={handleChange}
            required
            style={styles.input}/>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="addonName" style={styles.label}> Add-On Name: </label>
          <input
            type="text"
            id="addonName"
            name="addonName"
            value={formData.addonName}
            onChange={handleChange}
            required
            style={styles.input}/>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}> Description: </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{...styles.input, ...styles.textarea}}/>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="additionalPremium" style={styles.label}> Additional Premium: </label>
          <input
            type="number"
            id="additionalPremium"
            name="additionalPremium"
            value={formData.additionalPremium}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            style={styles.input}/>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting} 
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? styles.submitButtonDisabled : {})
          }}
          onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
          onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}>
          {isSubmitting ? 'Adding...' : 'Add Policy Add-On'}
        </button>
      </form>
    </div>
  );
};