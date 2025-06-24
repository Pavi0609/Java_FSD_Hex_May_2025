import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

{/* 1. Add new user */}

const API_TOKEN = '54a9e7025af02e339a47b4b5538022802ba5fc1e6368946f3a1d13b18700a001'; 

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
  });
  const [message, setMessage] = useState('');

  {/* 1. Add new user */}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage('Name and Email are required');
      return;
    }

    try {

      await axios.post('https://gorest.co.in/public/v2/users', formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('User added successfully! Redirecting...');
      setTimeout(() => navigate('/userList'), 2000);

    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user: ' + (error.response?.data?.message || error.message));
    }

  };

 return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name * &nbsp;&nbsp; </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email * &nbsp;&nbsp;&nbsp; </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Gender &nbsp;&nbsp; </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Status &nbsp;&nbsp;&nbsp;&nbsp; </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <br />
        <div className="button-container">
          <button type="submit" style={{background: 'green', color: 'white'}} >
            Submit
          </button>
        </div>
      </form>
    </div>
  )

}

export default AddUser;