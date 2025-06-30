import React, { useState } from 'react';
import axios from 'axios';

const CustomerAddPicture = ({ customerId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsUploading(true);
      setMessage('Uploading...');
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/customer/profile/upload/${customerId}`, formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setMessage('Profile picture uploaded successfully!');
      onUploadSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload Profile Picture</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
      <button onClick={handleUpload} disabled={!selectedFile || isUploading} className="upload-btn">
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {selectedFile && (
        <p className="file-info">Selected: {selectedFile.name}</p>
      )}
      {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
      
      <style jsx>{`
        .upload-container {
          padding: 20px;
          border: 1px dashed #ccc;
          border-radius: 8px;
          margin: 20px 0;
          max-width: 400px;
        }
        .file-input {
          margin: 10px 0;
          display: block;
        }
        .upload-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .upload-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
        .file-info {
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }
        .message {
          margin-top: 10px;
          padding: 8px;
          border-radius: 4px;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
        }
        .error {
          background-color: #f8d7da;
          color: #721c24;
        }
      `}</style>
    </div>
  );
};

export default CustomerAddPicture;