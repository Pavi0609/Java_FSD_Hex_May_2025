import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    customerDob: '',
    customerAge: '',
    customerAadharNo: '',
    customerPanNo: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate age when dob changes
  useEffect(() => {
    if (formData.customerDob) {
      const dob = new Date(formData.customerDob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      // Adjust age if birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      setFormData(prev => ({
        ...prev,
        customerAge: age.toString()
      }));
    }
  }, [formData.customerDob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Address is required';
    }
    
    if (!formData.customerDob) {
      newErrors.customerDob = 'Date of Birth is required';
    } else {
      const dob = new Date(formData.customerDob);
      const today = new Date();
      if (dob > today) {
        newErrors.customerDob = 'Date of Birth cannot be in the future';
      }
    }
    
    if (!formData.customerAadharNo || !/^\d{12}$/.test(formData.customerAadharNo)) {
      newErrors.customerAadharNo = 'Valid 12-digit Aadhar number is required';
    }
    
    if (!formData.customerPanNo || !/^[A-Z]{3}\d{7}$/.test(formData.customerPanNo)) {
      newErrors.customerPanNo = 'Valid PAN number is required (format: PAN1234567)';
    }
    
    if (!formData.username || !/^\S+@\S+\.\S+$/.test(formData.username)) {
      newErrors.username = 'Valid email is required';
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        customerName: formData.customerName,
        customerAddress: formData.customerAddress,
        customerDob: formData.customerDob,
        customerAge: parseInt(formData.customerAge),
        customerAadharNo: formData.customerAadharNo,
        customerPanNo: formData.customerPanNo,
        user: {
          username: formData.username,
          password: formData.password,
          role: "CUSTOMER"
        }
      };
      
      const response = await axios.post('http://localhost:8080/api/customer/add', payload);
      if (response.status === 200) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter your full name"/>
          {errors.customerName && <span className="error">{errors.customerName}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            placeholder="Enter your address"/>
          {errors.customerAddress && <span className="error">{errors.customerAddress}</span>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="customerDob"
            value={formData.customerDob}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}/> 
          {errors.customerDob && <span className="error">{errors.customerDob}</span>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="customerAge"
            value={formData.customerAge}
            onChange={handleChange}
            placeholder="Auto-calculated from DOB"
            readOnly/>
        </div>

        <div className="form-group">
          <label>Aadhar Number</label>
          <input
            type="text"
            name="customerAadharNo"
            value={formData.customerAadharNo}
            onChange={handleChange}
            placeholder="Enter 12-digit Aadhar number"
            maxLength="12"/>
          {errors.customerAadharNo && <span className="error">{errors.customerAadharNo}</span>}
        </div>

        <div className="form-group">
          <label>PAN Number</label>
          <input
            type="text"
            name="customerPanNo"
            value={formData.customerPanNo}
            onChange={handleChange}
            placeholder="Enter PAN number (e.g., PAN1234567)"
            maxLength="10"/>
          {errors.customerPanNo && <span className="error">{errors.customerPanNo}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your email"/>
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"/>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"/>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <style jsx>{`
        .signup-container {
          max-width: 500px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #2c3e50;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        input:focus {
          outline: none;
          border-color: #3498db;
        }
        input[readonly] {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
        .error {
          color: #e74c3c;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #2c3e50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #1a252f;
        }
        button:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};