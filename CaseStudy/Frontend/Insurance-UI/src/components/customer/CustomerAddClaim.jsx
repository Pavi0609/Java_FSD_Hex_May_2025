import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CustomerAddClaim = () => {
  const [customer, setCustomer] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    incidentDescription: '',
    settlementAmount: '',
    proposalId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await axios.get('http://localhost:8080/api/customer/get-one-username', {
          headers: { "Authorization": "Bearer " + token }
        });
        setCustomer(customerResponse.data);
        // Fetch proposals for the customer
        const proposalsResponse = await axios.get('http://localhost:8080/api/proposal/get-one-cusotmer',{
          headers: { "Authorization": "Bearer " + token }
        });
        setProposals(proposalsResponse.data);
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
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.proposalId || !formData.incidentDescription || !formData.settlementAmount) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/claims/add/customer/${customer.id}/proposal/${formData.proposalId}`,
        {
          incidentDescription: formData.incidentDescription,
          settlementAmount: parseFloat(formData.settlementAmount)
        },
        {
          headers: { "Authorization": "Bearer " + token }
        }
      );
      setSuccess(true);
      setError(null);
      // Reset form
      setFormData({
        incidentDescription: '',
        settlementAmount: '',
        proposalId: ''
      });
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/customerDashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading customer data...</div>;
  }

  if (error && !loading) {
    return <div className="error">Error: {error}</div>;
  }

  if (!customer) {
    return <div className="error">No customer data available</div>;
  }

  return (
    <div className="claim-container">
      <h2>Submit New Claim</h2>
      {success && (
        <div className="success-message"> Claim submitted successfully! Redirecting... </div>
      )}
      <form onSubmit={handleSubmit} className="claim-form">
        <div className="form-group">
          <label htmlFor="proposalId">Select Proposal:</label>
          <select
            id="proposalId"
            name="proposalId"
            value={formData.proposalId}
            onChange={handleChange}
            required>
            <option value="">-- Select a Proposal --</option>
            {proposals.map(proposal => (
              <option key={proposal.proposalId} value={proposal.proposalId}>
                {proposal.policy.policyName} - {proposal.vehicleModel} ({proposal.registrationNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="incidentDescription">Incident Description:</label>
          <textarea
            id="incidentDescription"
            name="incidentDescription"
            value={formData.incidentDescription}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Describe the incident in detail..."/>
        </div>

        <div className="form-group">
          <label htmlFor="settlementAmount">Settlement Amount (₹):</label>
          <input
            type="number"
            id="settlementAmount"
            name="settlementAmount"
            value={formData.settlementAmount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="Enter amount"/>
        </div>

        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-btn"> Submit Claim </button>
      </form>

      <style jsx>{`
        .claim-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        h2 {
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }
        
        .claim-form {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #444;
        }
        
        select, textarea, input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        textarea {
          resize: vertical;
        }
        
        .submit-btn {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          transition: background-color 0.3s;
        }
        
        .submit-btn:hover {
          background-color: #45a049;
        }
        
        .loading, .error {
          text-align: center;
          padding: 40px;
          font-size: 18px;
        }
        
        .error {
          color: #d9534f;
        }
        
        .success-message {
          background-color: #dff0d8;
          color: #3c763d;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .error-message {
          color: #d9534f;
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f2dede;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};