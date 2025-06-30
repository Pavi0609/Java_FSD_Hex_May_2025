import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewPolicy = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [policiesPerPage] = useState(5); // Number of policies per page

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/policy/get-all');
        if (!response.ok) {
          throw new Error('Failed to fetch policies');
        }
        const data = await response.json();
        setPolicies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  // Get current policies
  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = policies.slice(indexOfFirstPolicy, indexOfLastPolicy);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading policies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const getVehicleType = (policyName) => {
    if (policyName.includes('Two-Wheeler')) return 'Bike';
    if (policyName.includes('Heavy Vehicle')) return 'Camper Van';
    if (policyName.includes('Car')) return 'Car';
    return 'Other';
  };

  return (
    <div className="policy-container">
      <h1>Policy Management</h1>
      <table className="policy-table">
        <thead>
          <tr>
            <th>Policy ID</th>
            <th>Policy Name</th>
            <th>Vehicle Type</th>
            <th>Premium Amount</th>
            <th>Status</th>
            <th>Coverage Period</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentPolicies.map((policy) => (
            <tr key={policy.policyId}>
              <td>{policy.policyId}</td>
              <td>{policy.policyName}</td>
              <td>{getVehicleType(policy.policyName)}</td>
              <td>₹{policy.premiumAmount.toFixed(2)}</td>
              <td>
                <span className={`status-badge ${policy.policyStatus.toLowerCase()}`}>
                  {policy.policyStatus}
                </span>
              </td>
              <td>
                {new Date(policy.startDate).toLocaleDateString()} -{' '}
                {new Date(policy.endDate).toLocaleDateString()}
              </td>
              <td>
                <button className="action-btn apply-btn" onClick={() => navigate('/login')}>Apply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {Math.ceil(policies.length / policiesPerPage)}
        </span>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(policies.length / policiesPerPage)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewPolicy;

const styles = `
  .policy-container {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .policy-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .policy-table th, 
  .policy-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  .policy-table th {
    background-color: #f5f5f5;
    font-weight: 600;
    color: #333;
  }

  .policy-table tr:hover {
    background-color: #f9f9f9;
  }

  .status-badge {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .status-badge.active {
    background-color: #e6f7e6;
    color: #2e7d32;
  }

  .status-badge.expired {
    background-color: #ffebee;
    color: #c62828;
  }

  .status-badge.pending {
    background-color: #fff8e1;
    color: #f57f17;
  }

  .action-btn {
    padding: 6px 12px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .view-btn {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  .view-btn:hover {
    background-color: #bbdefb;
  }

  .apply-btn {
    background-color: #e8f5e9;
    color: #388e3c;
  }

  .apply-btn:hover {
    background-color: #c8e6c9;
  }

  .loading, .error {
    padding: 20px;
    text-align: center;
    font-size: 16px;
  }

  .error {
    color: #d32f2f;
  }

  /* Pagination styles */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
  }

  .pagination-button {
    padding: 8px 16px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .pagination-button:hover:not(:disabled) {
    background-color: #e0e0e0;
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 14px;
    color: #555;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);