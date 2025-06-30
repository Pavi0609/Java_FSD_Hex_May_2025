import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Claim = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Get token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/claims/get-all', { 
          headers: { "Authorization": "Bearer " + token }
       });
        setClaims(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchClaims();
  }, [token]);

  const handleStatusUpdate = async (claimId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/claims/update-status/${claimId}?newStatus=${newStatus}`, {}, {
        headers: { "Authorization": "Bearer " + token }
      });
      // Refresh the claims list after update
      const response = await axios.get('http://localhost:8080/api/claims/get-all',{ 
        headers: { "Authorization": "Bearer " + token }
      });
      setClaims(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-title">Error</p>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button"> Retry </button>
      </div>
    );
  }

  return (
    <div className="claim-container">
      <style>
        {`
          .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 256px;
          }
          
          .spinner {
            animation: spin 1s linear infinite;
            border-radius: 50%;
            height: 48px;
            width: 48px;
            border-top: 2px solid #3b82f6;
            border-bottom: 2px solid #3b82f6;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .error-container {
            padding: 1rem;
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            color: #b91c1c;
          }
          
          .error-title {
            font-weight: bold;
          }
          
          .retry-button {
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: #ef4444;
            color: white;
            border-radius: 0.25rem;
          }
          
          .retry-button:hover {
            background-color: #dc2626;
          }
          
          .claim-container {
            padding: 1rem;
          }
          
          .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          
          .header-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1f2937;
          }
          
          .table-container {
            overflow-x: auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border-radius: 0.5rem;
          }
          
          .data-table {
            width: 100%;
            background-color: white;
            border: 1px solid #e5e7eb;
          }
          
          .table-header {
            background-color: #f9fafb;
          }
          
          .table-header-cell {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
            font-weight: 500;
            color: #374151;
          }
          
          .table-row {
            transition: background-color 0.2s;
          }
          
          .table-row:hover {
            background-color: #f9fafb;
          }
          
          .table-cell {
            padding: 1rem 1rem;
            font-size: 0.875rem;
            color: #374151;
          }
          
          .customer-name {
            font-weight: 500;
            color: #111827;
          }
          
          .customer-details {
            font-size: 0.875rem;
            color: #6b7280;
          }
          
          .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.625rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .status-pending {
            background-color: #fef3c7;
            color: #92400e;
          }
          
          .status-approved {
            background-color: #d1fae5;
            color: #065f46;
          }
          
          .action-buttons {
            display: flex;
            gap: 0.5rem;
          }
          
          .accept-button {
            padding: 0.25rem 0.75rem;
            background-color: #22c55e;
            color: white;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
          }
          
          .accept-button:hover {
            background-color: #16a34a;
          }
          
          .reject-button {
            padding: 0.25rem 0.75rem;
            background-color: #ef4444;
            color: white;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
          }
          
          .reject-button:hover {
            background-color: #dc2626;
          }
          
          .processed-text {
            font-size: 0.875rem;
            color: #6b7280;
          }
        `}
      </style>
      
      <div className="header-container">
        <h1 className="header-title">Claims Management</h1>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Claim ID</th>
              <th className="table-header-cell">Customer</th>
              <th className="table-header-cell">Vehicle</th>
              <th className="table-header-cell">Incident</th>
              <th className="table-header-cell">Date</th>
              <th className="table-header-cell">Amount</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.claimId} className="table-row">
                <td className="table-cell">{claim.claimId}</td>
                <td className="table-cell">
                  <div className="customer-name">{claim.customer.customerName}</div>
                  <div className="customer-details">{claim.customer.customerAddress}</div>
                </td>
                <td className="table-cell">
                  <div className="customer-name">{claim.proposal.vehicleType}</div>
                  <div className="customer-details">{claim.proposal.vehicleModel} ({claim.proposal.registrationNumber})</div>
                </td>
                <td className="table-cell">{claim.incidentDescription}</td>
                <td className="table-cell">{new Date(claim.claimDate).toLocaleDateString()}</td>
                <td className="table-cell">₹{claim.settlementAmount.toFixed(2)}</td>
                <td className="table-cell">
                  <span className={`status-badge ${
                    claim.claimStatus ? 'status-approved' : 'status-pending'
                  }`}>
                    {claim.claimStatus ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="action-buttons">
                    {!claim.claimStatus && (
                      <>
                        <button className="accept-button" onClick={() => handleStatusUpdate(claim.claimId, true)}> Accept </button>
                        <button className="reject-button" onClick={() => handleStatusUpdate(claim.claimId, false)}> Reject </button>
                      </>
                    )}
                    {claim.claimStatus && (
                      <span className="processed-text">Processed</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};