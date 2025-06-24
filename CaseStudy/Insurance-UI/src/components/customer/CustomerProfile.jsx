import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomerAppBar from './CustomerAppBar';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/customer/get-one-username', {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        // Store customer ID in localStorage for use in other components
        localStorage.setItem('customerId', response.data.id);
        
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('customerId');
          navigate('/login');
        }
      }
    };

    fetchProfileData();
  }, [navigate]);

  const styles = {
    profileContainer: {
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
    profileCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    section: {
      marginBottom: '25px'
    },
    sectionTitle: {
      color: '#3498db',
      marginBottom: '15px',
      fontSize: '20px'
    },
    infoRow: {
      display: 'flex',
      marginBottom: '15px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee'
    },
    label: {
      fontWeight: 'bold',
      width: '200px',
      color: '#555'
    },
    value: {
      flex: 1,
      color: '#333'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      color: '#555'
    },
    error: {
      textAlign: 'center',
      padding: '40px',
      color: '#e74c3c'
    },
    editButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
      ':hover': {
        backgroundColor: '#2980b9'
      }
    }
  };

  if (loading) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.loading}>Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.error}>No profile data available</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerAppBar />
      <div style={styles.profileContainer}>
        <h1 style={styles.header}>Customer Profile</h1>
        
        <div style={styles.profileCard}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Personal Information</h2>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Customer ID:</div>
              <div style={styles.value}>{profileData.id}</div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Full Name:</div>
              <div style={styles.value}>{profileData.customerName}</div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Date of Birth:</div>
              <div style={styles.value}>{profileData.customerDob} (Age: {profileData.customerAge})</div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Address:</div>
              <div style={styles.value}>{profileData.customerAddress}</div>
            </div>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Identification Details</h2>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Aadhar Number:</div>
              <div style={styles.value}>{profileData.customerAadharNo}</div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>PAN Number:</div>
              <div style={styles.value}>{profileData.customerPanNo}</div>
            </div>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Account Information</h2>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Username/Email:</div>
              <div style={styles.value}>{profileData.user.username}</div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.label}>Account Type:</div>
              <div style={styles.value}>{profileData.user.role}</div>
            </div>
          </div>
          
          <button style={styles.editButton}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;