import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { proposalId, policyId, proposalData } = location.state || {};
  
  const [formData, setFormData] = useState({
    premiumAmount: 0,
    generatedDate: new Date().toISOString().split('T')[0],
    validityPeriod: 365
  });
  
  const [policyDetails, setPolicyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!proposalId || !policyId) {
      navigate('/proposals');
      return;
    }

    const fetchPolicyDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8080/api/policy/get-one/${policyId}`,
          {
            headers: { "Authorization": `Bearer ${token}` }
          }
        );
        
        setPolicyDetails(response.data);
        setFormData(prev => ({
          ...prev,
          premiumAmount: response.data.premiumAmount
        }));
      } catch (err) {
        setError(`Failed to load policy details: ${err.message}`);
        console.error("Error fetching policy:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyDetails();
  }, [policyId, navigate, proposalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8080/api/quote/add/proposal/${proposalId}`,
        formData,
        {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      alert('Quote created successfully!');
      console.log('Quote created:', response.data);
      navigate('/admin');
    } catch (err) {
      setError(`Failed to create quote: ${err.response?.data?.message || err.message}`);
      console.error("Error creating quote:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'premiumAmount' ? parseFloat(value) : value
    }));
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading quote details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create Quote</h2>
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Proposal Details</h5>
          {proposalData && (
            <div className="mb-4">
              <p><strong>Proposal ID:</strong> {proposalData.proposalId}</p>
              <p><strong>Customer:</strong> {proposalData.customer.customerName}</p>
              <p><strong>Vehicle:</strong> {proposalData.vehicleType} - {proposalData.vehicleModel}</p>
              <p><strong>Registration:</strong> {proposalData.registrationNumber}</p>
            </div>
          )}

          {policyDetails && (
            <div className="mb-4">
              <h5 className="card-title">Policy Details</h5>
              <p><strong>Policy:</strong> {policyDetails.policyName}</p>
              <p><strong>Coverage Period:</strong> {new Date(policyDetails.startDate).toLocaleDateString()} - {new Date(policyDetails.endDate).toLocaleDateString()}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="premiumAmount" className="form-label">Premium Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                id="premiumAmount"
                name="premiumAmount"
                value={formData.premiumAmount}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="generatedDate" className="form-label">Generated Date</label>
              <input
                type="date"
                className="form-control"
                id="generatedDate"
                name="generatedDate"
                value={formData.generatedDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="validityPeriod" className="form-label">Validity Period (days)</label>
              <input
                type="number"
                className="form-control"
                id="validityPeriod"
                name="validityPeriod"
                value={formData.validityPeriod}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-end">
              <button 
                type="button" 
                className="btn btn-secondary me-2"
                onClick={() => navigate('/proposals')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuote;