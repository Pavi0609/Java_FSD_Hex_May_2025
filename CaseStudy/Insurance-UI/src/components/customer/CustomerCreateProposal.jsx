import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerAppBar from './CustomerAppBar';

const CustomerCreateProposal = () => {
  const vehicleTypes = ['Car', 'Bike', 'Truck', 'Camper Van'];
  
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleModel: '',
    registrationNumber: '',
    manufactureYear: '',
    submittedDate: new Date().toISOString().split('T')[0],
    policyId: ''
  });
  
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Configure axios instance with auth header
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  // Fetch customer profile and available policies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer profile to get customerId
        const profileResponse = await api.get('/customer/get-one-username');
        setCustomerId(profileResponse.data.id);

        // Fetch all policies
        const policiesResponse = await api.get('/policy/get-all');
        setPolicies(policiesResponse.data);
        setFilteredPolicies(policiesResponse.data.filter(policy => policy.policyStatus === 'ACTIVE'));
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [api, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'vehicleType') {
      const filtered = policies.filter(policy => 
        policy.policyStatus === 'ACTIVE' && 
        policy.policyName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPolicies(filtered);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      await api.post(
        `/proposal/add/${customerId}/${formData.policyId}`,
        {
          vehicleType: formData.vehicleType,
          vehicleModel: formData.vehicleModel,
          registrationNumber: formData.registrationNumber,
          manufactureYear: formData.manufactureYear,
          submittedDate: formData.submittedDate
        }
      );
      setSubmissionStatus('success');
      setTimeout(() => navigate('/customerDashboard'), 2000);
    } catch (err) {
      setSubmissionStatus('error');
      setError(err.response?.data?.message || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
      marginBottom: '30px'
    },
    formCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px'
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
      backgroundColor: 'white'
    },
    policyCard: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    policyCardSelected: {
      border: '2px solid #3498db',
      backgroundColor: '#f0f8ff'
    },
    policyTitle: {
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#2c3e50'
    },
    policyDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#555'
    },
    submitButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '20px',
      width: '100%',
      ':hover': {
        backgroundColor: '#2980b9'
      }
    },
    loading: {
      textAlign: 'center',
      padding: '20px',
      color: '#555'
    },
    error: {
      color: '#e74c3c',
      textAlign: 'center',
      padding: '10px',
      marginBottom: '20px'
    },
    success: {
      color: '#27ae60',
      textAlign: 'center',
      padding: '10px',
      marginBottom: '20px'
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading data...</div>;
  }

  if (error && !submissionStatus) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div>
        <CustomerAppBar />
    <div style={styles.container}>
      <h1 style={styles.header}>Create New Proposal</h1>
      
      <div style={styles.formCard}>
        {submissionStatus === 'success' && (
          <div style={styles.success}>Proposal submitted successfully! Redirecting...</div>
        )}
        
        {submissionStatus === 'error' && (
          <div style={styles.error}>Error submitting proposal: {error}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Vehicle Type:</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              style={styles.select}
              required
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Vehicle Model:</label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="e.g., Winnebago Revel 44E"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="e.g., MH05CV2028"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Manufacture Year:</label>
            <input
              type="text"
              name="manufactureYear"
              value={formData.manufactureYear}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="e.g., 2022"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Insurance Policy:</label>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map(policy => (
                  <div
                    key={policy.policyId}
                    style={{
                      ...styles.policyCard,
                      ...(formData.policyId === policy.policyId.toString() ? styles.policyCardSelected : {})
                    }}
                    onClick={() => setFormData({...formData, policyId: policy.policyId.toString()})}
                  >
                    <div style={styles.policyTitle}>{policy.policyName}</div>
                    <div style={styles.policyDetails}>
                      <span>Premium: ₹{policy.premiumAmount}</span>
                      <span>Coverage: {policy.startDate} to {policy.endDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '15px', textAlign: 'center', color: '#555' }}>
                  {formData.vehicleType 
                    ? `No matching policies found for ${formData.vehicleType}. Try a different vehicle type.`
                    : 'Please select a vehicle type to see available policies'}
                </div>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            style={styles.submitButton}
            disabled={submissionStatus === 'submitting' || !formData.policyId}
          >
            {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CustomerCreateProposal;