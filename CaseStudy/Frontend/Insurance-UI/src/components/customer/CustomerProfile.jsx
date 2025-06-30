import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomerAppBar from './CustomerAppBar';
import { useNavigate } from 'react-router-dom';
import CustomerAddPicture from './CustomerAddPicture';

const CustomerProfile = () => {
  const navigate = useNavigate(); 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [editFormData, setEditFormData] = useState({
    customerName: '',
    customerAddress: '',
    customerDob: '',
    customerAge: '',
    customerAadharNo: '',
    customerPanNo: ''
  });

  // Define all handler functions
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/customer/get-one-username', {
          headers: { "Authorization": "Bearer " + token }
        });
        localStorage.setItem('customerId', response.data.id);    
        setProfileData(response.data);
        setEditFormData({
          customerName: response.data.customerName,
          customerAddress: response.data.customerAddress,
          customerDob: response.data.customerDob.split('T')[0],
          customerAge: response.data.customerAge,
          customerAadharNo: response.data.customerAadharNo,
          customerPanNo: response.data.customerPanNo
        });
        await fetchProfilePicture(response.data.id);
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

  const fetchProfilePicture = async (customerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/customer/profile/get/${customerId}`,
        {
          headers: { "Authorization": "Bearer " + token },
          responseType: 'blob'
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
    } catch (error) {
      // Profile picture might not exist, which is okay
      setProfileImage(null);
    }
  };

  const handleProfileUploadSuccess = () => {
    if (profileData) {
      fetchProfilePicture(profileData.id);
    }
  };

  if (loading) {
    return (
      <div>
        <CustomerAppBar />
        <div className="loading">Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomerAppBar />
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div>
        <CustomerAppBar />
        <div className="error-message">No profile data available</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerAppBar />
      <div className="profile-container">
        <h1 className="profile-header">
          Customer Profile
          {!isEditing && (
            <button onClick={handleEditClick} className="edit-btn"> Edit Profile </button>
          )}
        </h1>
        
        <div className="profile-card">
          <div className="avatar-section">
            <div className="avatar-container">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={profileData.customerName}
                  className="profile-avatar" />
              ) : (
                <div className="profile-avatar placeholder">
                  {profileData.customerName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="avatar-actions">
              <CustomerAddPicture 
                customerId={profileData.id} 
                onUploadSuccess={handleProfileUploadSuccess} />
            </div>
          </div>

          {!isEditing ? (
            <>
              <div className="section">
                <h2 className="section-title">Personal Information</h2>
                
                <div className="info-row">
                  <div className="label">Customer ID:</div>
                  <div className="value">{profileData.id}</div>
                </div>
                
                <div className="info-row">
                  <div className="label">Full Name:</div>
                  <div className="value">{profileData.customerName}</div>
                </div>
                
                <div className="info-row">
                  <div className="label">Date of Birth:</div>
                  <div className="value">{profileData.customerDob} (Age: {profileData.customerAge})</div>
                </div>
                
                <div className="info-row">
                  <div className="label">Address:</div>
                  <div className="value">{profileData.customerAddress}</div>
                </div>
              </div>
              
              <div className="section">
                <h2 className="section-title">Identification Details</h2>
                
                <div className="info-row">
                  <div className="label">Aadhar Number:</div>
                  <div className="value">{profileData.customerAadharNo}</div>
                </div>
                
                <div className="info-row">
                  <div className="label">PAN Number:</div>
                  <div className="value">{profileData.customerPanNo}</div>
                </div>
              </div>
              
              <div className="section">
                <h2 className="section-title">Account Information</h2>
                
                <div className="info-row">
                  <div className="label">Username/Email:</div>
                  <div className="value">{profileData.user.username}</div>
                </div>
                
                <div className="info-row">
                  <div className="label">Account Type:</div>
                  <div className="value">{profileData.user.role}</div>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="section">
                <h2 className="section-title">Edit Personal Information</h2>
                
                <div className="form-row">
                  <label className="form-label">Full Name:</label>
                  <input
                    type="text"
                    name="customerName"
                    value={editFormData.customerName}
                    onChange={handleInputChange}
                    className="form-input"
                    required />
                </div>
                
                <div className="form-row">
                  <label className="form-label">Date of Birth:</label>
                  <input
                    type="date"
                    name="customerDob"
                    value={editFormData.customerDob}
                    onChange={handleInputChange}
                    className="form-input"
                    required />
                </div>
                
                <div className="form-row">
                  <label className="form-label">Age:</label>
                  <input
                    type="number"
                    name="customerAge"
                    value={editFormData.customerAge}
                    onChange={handleInputChange}
                    className="form-input"
                    required />
                </div>
                
                <div className="form-row">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    name="customerAddress"
                    value={editFormData.customerAddress}
                    onChange={handleInputChange}
                    className="form-input"
                    required />
                </div>
              </div>
              
              <div className="section">
                <h2 className="section-title">Edit Identification Details</h2>
                
                <div className="form-row">
                  <label className="form-label">Aadhar Number:</label>
                  <input
                    type="text"
                    name="customerAadharNo"
                    value={editFormData.customerAadharNo}
                    onChange={handleInputChange}
                    className="form-input"
                    required />
                </div>
                
                <div className="form-row">
                  <label className="form-label">PAN Number:</label>
                  <input
                    type="text"
                    name="customerPanNo"
                    value={editFormData.customerPanNo}
                    onChange={handleInputChange}
                    className="form-input"
                    required />
                </div>
              </div>
              
              <button type="submit" className="submit-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 30px;
          font-family: Arial, sans-serif;
        }
        
        .profile-header {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .profile-card {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .avatar-section {
          display: flex;
          margin-bottom: 25px;
          align-items: flex-start;
        }
        
        .avatar-container {
          margin-right: 20px;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #3498db;
        }
        
        .profile-avatar.placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #3498db;
          color: white;
          font-size: 48px;
          font-weight: bold;
        }
        
        .avatar-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .edit-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .delete-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          color: #555;
        }
        
        .error-message {
          text-align: center;
          padding: 40px;
          color: #e74c3c;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          color: #3498db;
          margin-bottom: 15px;
          font-size: 20px;
        }
        
        .info-row {
          display: flex;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .label {
          font-weight: bold;
          width: 200px;
          color: #555;
        }
        
        .value {
          flex: 1;
          color: #333;
        }
        
        .form-row {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
        }
        
        .form-label {
          font-weight: bold;
          width: 200px;
          color: #555;
          margin-right: 15px;
        }
        
        .form-input {
          flex: 1;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 16px;
        }
        
        .submit-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
          margin-right: 10px;
        }
        
        .cancel-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default CustomerProfile;