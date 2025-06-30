import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/payments_new/get-all', { 
          headers: { "Authorization": "Bearer " + token }
        });
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

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
        <button className="retry-button" onClick={() => window.location.reload()}> Retry</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
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
            margin-bottom: 0.5rem;
          }
          
          .retry-button {
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: #ef4444;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
          }
          
          .retry-button:hover {
            background-color: #dc2626;
          }
          
          .payment-container {
            padding: 1rem;
            max-width: 1200px;
            margin: 0 auto;
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
            border-collapse: collapse;
          }
          
          .table-header {
            background-color: #f9fafb;
          }
          
          .table-header-cell {
            padding: 0.75rem 1rem;
            text-align: left;
            font-weight: 500;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .table-row {
            transition: background-color 0.2s;
          }
          
          .table-row:hover {
            background-color: #f9fafb;
          }
          
          .table-cell {
            padding: 1rem;
            font-size: 0.875rem;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
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
          
          .status-paid {
            background-color: #d1fae5;
            color: #065f46;
          }
          
          .amount-cell {
            font-weight: 600;
          }
          
          .method-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.625rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 500;
            background-color: #e0e7ff;
            color: #4338ca;
          }
        `}
      </style>
      
      <div className="header-container">
        <h1 className="header-title">Payment Management</h1>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Payment ID</th>
              <th className="table-header-cell">Customer</th>
              <th className="table-header-cell">Vehicle</th>
              <th className="table-header-cell">Date</th>
              <th className="table-header-cell">Amount</th>
              <th className="table-header-cell">Method</th>
              <th className="table-header-cell">Status</th>
            </tr>
          </thead>
          
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId} className="table-row">
                <td className="table-cell">{payment.paymentId}</td>
                <td className="table-cell">
                  <div className="customer-name">{payment.customer.customerName}</div>
                  <div className="customer-details">{payment.customer.customerAddress}</div>
                </td>
                <td className="table-cell">
                  {payment.proposal ? (
                    <>
                      <div className="customer-name">{payment.proposal.vehicleType}</div>
                      <div className="customer-details">
                        {payment.proposal.vehicleModel} ({payment.proposal.registrationNumber})
                      </div>
                    </>
                  ) : (
                    <div className="customer-details">No vehicle info</div>
                  )}
                </td>
                <td className="table-cell">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="table-cell amount-cell">₹{payment.amountPaid.toFixed(2)}</td>
                <td className="table-cell">
                  <span className="method-badge">
                    {payment.paymentMethod.replace('_', ' ')}
                  </span>
                </td>
                <td className="table-cell">
                  <span className={`status-badge ${
                    payment.paymentStatus === 'PAID' ? 'status-paid' : 'status-pending'
                  }`}>
                    {payment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};