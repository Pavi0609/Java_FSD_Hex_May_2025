import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewPolicy = () => {

  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          {policies.map((policy) => (
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
                <button className="action-btn view-btn">View</button>
                <button className="action-btn apply-btn" onClick={() => navigate('/login')}>Apply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPolicy;

// CSS styles
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
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);