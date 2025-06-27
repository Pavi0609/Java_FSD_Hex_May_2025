import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomerAppBar from './CustomerAppBar';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    customerName: '',
    customerAddress: '',
    customerDob: '',
    customerAge: '',
    customerAadharNo: '',
    customerPanNo: ''
  });

  const navigate = useNavigate();

  useEffect(() => {

    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/customer/get-one-username', {
          headers: { "Authorization": "Bearer " + token }
        });
        
        localStorage.setItem('customerId', response.data.id);    
        setProfileData(response.data);
        // Initialize edit form data with current profile data
        setEditFormData({
          customerName: response.data.customerName,
          customerAddress: response.data.customerAddress,
          customerDob: response.data.customerDob.split('T')[0], // Format date for input
          customerAge: response.data.customerAge,
          customerAadharNo: response.data.customerAadharNo,
          customerPanNo: response.data.customerPanNo
        });
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form data to current profile data
    if (profileData) {
      setEditFormData({
        customerName: profileData.customerName,
        customerAddress: profileData.customerAddress,
        customerDob: profileData.customerDob.split('T')[0],
        customerAge: profileData.customerAge,
        customerAadharNo: profileData.customerAadharNo,
        customerPanNo: profileData.customerPanNo
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/api/customer/update', editFormData, {
        headers: { "Authorization": "Bearer " + token }
      });
      setProfileData(response.data);
      setIsEditing(false);
      // Update the form data with the new values
      setEditFormData({
        customerName: response.data.customerName,
        customerAddress: response.data.customerAddress,
        customerDob: response.data.customerDob.split('T')[0],
        customerAge: response.data.customerAge,
        customerAadharNo: response.data.customerAadharNo,
        customerPanNo: response.data.customerPanNo
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

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
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
      marginRight: '10px',
      '&:hover': {
        backgroundColor: '#2980b9'
      }
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      '&:hover': {
        backgroundColor: '#c0392b'
      }
    },
    input: {
      flex: 1,
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px'
    },
    formRow: {
      display: 'flex',
      marginBottom: '15px',
      alignItems: 'center'
    },
    formLabel: {
      fontWeight: 'bold',
      width: '200px',
      color: '#555',
      marginRight: '15px'
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
          {!isEditing ? (
            <>
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
              
              <button style={styles.button} onClick={handleEditClick}> Edit Profile </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Edit Personal Information</h2>
                
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>Full Name:</label>
                  <input
                    type="text"
                    name="customerName"
                    value={editFormData.customerName}
                    onChange={handleInputChange}
                    style={styles.input}
                    required/>
                </div>
                
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>Date of Birth:</label>
                  <input
                    type="date"
                    name="customerDob"
                    value={editFormData.customerDob}
                    onChange={handleInputChange}
                    style={styles.input}
                    required/>
                </div>
                
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>Age:</label>
                  <input
                    type="number"
                    name="customerAge"
                    value={editFormData.customerAge}
                    onChange={handleInputChange}
                    style={styles.input}
                    required/>
                </div>
                
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>Address:</label>
                  <input
                    type="text"
                    name="customerAddress"
                    value={editFormData.customerAddress}
                    onChange={handleInputChange}
                    style={styles.input}
                    required/>
                </div>
              </div>
              
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Edit Identification Details</h2>
                
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>Aadhar Number:</label>
                  <input
                    type="text"
                    name="customerAadharNo"
                    value={editFormData.customerAadharNo}
                    onChange={handleInputChange}
                    style={styles.input}
                    required/>
                </div>
                
                <div style={styles.formRow}>
                  <label style={styles.formLabel}>PAN Number:</label>
                  <input
                    type="text"
                    name="customerPanNo"
                    value={editFormData.customerPanNo}
                    onChange={handleInputChange}
                    style={styles.input}
                    required/>
                </div>
              </div>
              
              <button type="submit" style={styles.button}> Save Changes </button>
              <button type="button" style={{ ...styles.button, ...styles.cancelButton }} onClick={handleCancelClick}> Cancel </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;