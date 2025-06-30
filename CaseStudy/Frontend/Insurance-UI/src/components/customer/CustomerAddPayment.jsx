import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerAppBar from './CustomerAppBar';

const CustomerAddPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();  
  const [paymentData, setPaymentData] = useState({
    amountPaid: 0,
    paymentMethod: 'CREDIT_CARD',
    paymentStatus: 'PAID',
    paymentDate: new Date().toISOString().split('T')[0]
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Get quote and customer data from navigation state
  const { quoteId, amount, proposalId } = location.state || {};

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/customer/get-one-username', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.id) {
          setCustomerId(response.data.id);
        } else {
          throw new Error('Customer ID not found in response');
        }
      } catch (err) {
        console.error('Failed to fetch customer ID:', err);
        setError('Failed to fetch customer information. Please try again.');
        navigate('/login');
      }
    };
    fetchCustomerId();
  }, [navigate]);

  useEffect(() => {
    if (customerId && quoteId && amount && proposalId) {
      setPaymentData(prev => ({
        ...prev,
        amountPaid: amount
      }));
    } else if (customerId && (!quoteId || !amount || !proposalId)) {
      navigate('/quotes');
    }
  }, [quoteId, amount, proposalId, customerId, navigate]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Basic card validation
    if (!validateCardDetails()) {
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      // Process payment with the new API endpoint
      const paymentResponse = await axios.post(
        `http://localhost:8080/api/payments_new/add/customer/${customerId}?proposalId=${proposalId}&quoteId=${quoteId}`, paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      // Update proposal status if payment was successful
      if (paymentResponse.data.paymentStatus === 'COMPLETED') {
        await axios.put(`http://localhost:8080/api/proposal/update-status/${proposalId}?newStatus=true`, {},
          {
            headers: { "Authorization": "Bearer " + token }
          }
        );
      }
      setSuccess(true);
      setTimeout(() => navigate('/customerDashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      console.error('Payment error:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const validateCardDetails = () => {
    // Simple validation - in a real app you'd want more robust checks
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (!cardDetails.expiryDate || !/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      setError('Please enter a valid 3-digit CVV');
      return false;
    }
    
    if (!cardDetails.cardholderName) {
      setError('Please enter the cardholder name');
      return false;
    }
    
    return true;
  };

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Segoe UI", Roboto, sans-serif'
    },
    paymentCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '30px',
      maxWidth: '600px',
      margin: '0 auto',
      borderLeft: '4px solid #ffc107'
    },
    header: {
      color: '#222',
      textAlign: 'center',
      marginBottom: '30px',
      paddingBottom: '15px',
      borderBottom: '3px solid #ffc107'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px'
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
      backgroundColor: 'white'
    },
    submitButton: {
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      marginTop: '20px',
      transition: 'background-color 0.3s',
      ':hover': {
        backgroundColor: '#0b7dda'
      }
    },
    loading: {
      textAlign: 'center',
      padding: '20px',
      color: '#555'
    },
    error: {
      color: '#e74c3c',
      textAlign: 'center',
      padding: '10px',
      marginBottom: '20px',
      backgroundColor: '#fdecea',
      borderRadius: '4px'
    },
    success: {
      color: '#27ae60',
      textAlign: 'center',
      padding: '10px',
      marginBottom: '20px',
      backgroundColor: '#e8f5e9',
      borderRadius: '4px'
    },
    amountDisplay: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#ffc107',
      textAlign: 'center',
      margin: '20px 0'
    },
    cardInputGroup: {
      display: 'flex',
      gap: '15px'
    },
    cardInputHalf: {
      flex: 1
    }
  };

  if (!customerId) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.loading}>Loading customer information...</div>
      </div>
    );
  }

  if (!quoteId || !amount || !proposalId) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.error}>Invalid payment information. Please select a quote first.</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerAppBar />
      <div style={styles.container}>
        <div style={styles.paymentCard}>
          <h1 style={styles.header}>Payment Information</h1>
          {error && <div style={styles.error}>{error}</div>}
          {success && (
            <div style={styles.success}>
              Payment successful! Redirecting to dashboard...
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit}>
              <div style={styles.amountDisplay}>
                Amount to Pay: ₹{paymentData.amountPaid.toFixed(2)}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Payment Method</label>
                <select
                  name="paymentMethod"
                  value={paymentData.paymentMethod}
                  onChange={handlePaymentChange}
                  style={styles.select}
                  required>
                  <option value="CREDIT_CARD">Credit Card</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  style={styles.input}
                  required/>
              </div>
              
              <div style={styles.cardInputGroup}>
                <div style={styles.cardInputHalf}>
                  <label style={styles.label}>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleCardChange}
                    style={styles.input}
                    required/>
                </div>

                <div style={styles.cardInputHalf}>
                  <label style={styles.label}>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    style={styles.input}
                    required/>
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  placeholder="Name on card"
                  value={cardDetails.cardholderName}
                  onChange={handleCardChange}
                  style={styles.input}
                  required/>
              </div>
              
              <button type="submit" style={styles.submitButton} disabled={loading}>
                {loading ? 'Processing...' : 'Make Payment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAddPayment;