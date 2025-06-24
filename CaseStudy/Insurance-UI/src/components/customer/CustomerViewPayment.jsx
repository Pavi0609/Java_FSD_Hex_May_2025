import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerAppBar from './CustomerAppBar';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const CustomerViewPayment = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const navigate = useNavigate();
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (!customerId) {
          throw new Error('Customer ID not found');
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8080/api/payments_new/get-one/customer/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        setPayments(response.data);
        // Select the first payment by default (you might want to select the most recent one)
        if (response.data.length > 0) {
          setSelectedPayment(response.data[0]);
        }
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

    fetchPayments();
  }, [customerId, navigate]);

  const handleDownloadReceipt = () => {
    if (!selectedPayment) return;

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Payment Receipt', 105, 20, { align: 'center' });
    
    // Payment details
    doc.setFontSize(12);
    doc.text(`Receipt #: ${selectedPayment.paymentId}`, 14, 30);
    doc.text(`Payment Date: ${new Date(selectedPayment.paymentDate).toLocaleDateString()}`, 14, 36);
    
    // Amount (highlighted)
    doc.setFontSize(16);
    doc.setTextColor(255, 193, 7);
    doc.text(`Amount Paid: ₹${selectedPayment.amountPaid.toFixed(2)}`, 105, 45, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    
    // Payment Information
    doc.text('Payment Information', 14, 60);
    autoTable(doc, {
      startY: 65,
      body: [
        ['Payment Method', selectedPayment.paymentMethod],
        ['Payment Status', selectedPayment.paymentStatus],
        ['Payment Date', new Date(selectedPayment.paymentDate).toLocaleDateString()]
      ],
      theme: 'grid',
      headStyles: { fillColor: [40, 40, 40] }
    });
    
    // Policy Information
    doc.text('Policy Information', 14, doc.lastAutoTable.finalY + 15);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      body: [
        ['Policy Name', selectedPayment.proposal.policy.policyName],
        ['Policy ID', selectedPayment.proposal.policy.policyId],
        ['Coverage Period', `${selectedPayment.proposal.policy.startDate} to ${selectedPayment.proposal.policy.endDate}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [40, 40, 40] }
    });
    
    // Vehicle Information
    doc.text('Vehicle Information', 14, doc.lastAutoTable.finalY + 15);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      body: [
        ['Vehicle Type', selectedPayment.proposal.vehicleType],
        ['Vehicle Model', selectedPayment.proposal.vehicleModel],
        ['Registration', selectedPayment.proposal.registrationNumber],
        ['Manufacture Year', selectedPayment.proposal.manufactureYear]
      ],
      theme: 'grid',
      headStyles: { fillColor: [40, 40, 40] }
    });
    
    doc.save(`payment-receipt-${selectedPayment.paymentId}.pdf`);
  };

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Segoe UI", Roboto, sans-serif'
    },
    summaryCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      borderLeft: '4px solid #ffc107'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    },
    cardTitle: {
      color: '#222',
      fontSize: '18px',
      fontWeight: '600'
    },
    cardAmount: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffc107'
    },
    cardDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '15px',
      marginBottom: '15px'
    },
    cardItem: {
      marginBottom: '5px'
    },
    cardLabel: {
      fontSize: '12px',
      color: '#777',
      fontWeight: '500'
    },
    cardValue: {
      fontSize: '14px',
      color: '#222',
      fontWeight: '500'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '5px 10px',
      borderRadius: '20px',
      fontWeight: '600',
      backgroundColor: selectedPayment?.paymentStatus === 'PAID' ? '#4CAF50' : 
                      selectedPayment?.paymentStatus === 'PENDING' ? '#FFC107' : '#F44336',
      color: 'white'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      gap: '15px'
    },
    viewButton: {
      backgroundColor: '#222',
      color: '#ffc107',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      ':hover': {
        backgroundColor: '#ffc107',
        color: '#222'
      }
    },
    downloadButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      ':hover': {
        backgroundColor: '#45a049'
      }
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      padding: '30px',
      width: '80%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#777',
      ':hover': {
        color: '#222'
      }
    },
    modalHeader: {
      color: '#222',
      textAlign: 'center',
      marginBottom: '30px',
      paddingBottom: '15px',
      borderBottom: '3px solid #ffc107'
    },
    modalSection: {
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee'
    },
    sectionTitle: {
      color: '#ffc107',
      fontSize: '18px',
      marginBottom: '15px',
      fontWeight: '600'
    },
    infoRow: {
      display: 'flex',
      marginBottom: '12px'
    },
    infoLabel: {
      width: '200px',
      fontWeight: '600',
      color: '#555'
    },
    infoValue: {
      flex: 1,
      color: '#222'
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      color: '#555'
    },
    error: {
      textAlign: 'center',
      padding: '40px',
      color: '#e74c3c'
    },
    paymentSelector: {
      marginBottom: '20px',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: '100%'
    }
  };

  if (loading) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.loading}>Loading payment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.error}>No payment data available</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerAppBar />
      <div style={styles.container}>
        {/* Payment Selector Dropdown */}
        {payments.length > 1 && (
          <div style={{ maxWidth: '800px', margin: '0 auto 20px' }}>
            <select 
              style={styles.paymentSelector}
              value={selectedPayment?.paymentId || ''}
              onChange={(e) => {
                const paymentId = parseInt(e.target.value);
                const payment = payments.find(p => p.paymentId === paymentId);
                setSelectedPayment(payment);
              }}
            >
              {payments.map(payment => (
                <option key={payment.paymentId} value={payment.paymentId}>
                  Payment #{payment.paymentId} - {new Date(payment.paymentDate).toLocaleDateString()} - ₹{payment.amountPaid.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Summary Card */}
        {selectedPayment && (
          <div style={styles.summaryCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>Payment #{selectedPayment.paymentId}</div>
                <div style={{ fontSize: '14px', color: '#777' }}>
                  {new Date(selectedPayment.paymentDate).toLocaleDateString()}
                </div>
              </div>
              <div style={styles.cardAmount}>₹{selectedPayment.amountPaid.toFixed(2)}</div>
            </div>
            
            <div style={styles.cardDetails}>
              <div style={styles.cardItem}>
                <div style={styles.cardLabel}>Payment Method</div>
                <div style={styles.cardValue}>{selectedPayment.paymentMethod}</div>
              </div>
              <div style={styles.cardItem}>
                <div style={styles.cardLabel}>Status</div>
                <div style={styles.cardValue}>
                  <span style={{
                    ...styles.statusBadge,
                    fontSize: '12px',
                    padding: '3px 8px'
                  }}>
                    {selectedPayment.paymentStatus}
                  </span>
                </div>
              </div>
              <div style={styles.cardItem}>
                <div style={styles.cardLabel}>Policy</div>
                <div style={styles.cardValue}>{selectedPayment.proposal.policy.policyName}</div>
              </div>
              <div style={styles.cardItem}>
                <div style={styles.cardLabel}>Vehicle</div>
                <div style={styles.cardValue}>
                  {selectedPayment.proposal.vehicleType} - {selectedPayment.proposal.vehicleModel}
                </div>
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              <button 
                style={styles.viewButton}
                onClick={() => {
                  setShowDetails(true);
                  setShowDownload(false);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Modal for Detailed View */}
        {showDetails && selectedPayment && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <button 
                style={styles.closeButton} 
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>
              
              <h1 style={styles.modalHeader}>Payment Details</h1>
              
              <div style={styles.modalSection}>
                <h2 style={styles.sectionTitle}>Payment Information</h2>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Payment ID:</div>
                  <div style={styles.infoValue}>{selectedPayment.paymentId}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Amount Paid:</div>
                  <div style={styles.infoValue}>₹{selectedPayment.amountPaid.toFixed(2)}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Payment Method:</div>
                  <div style={styles.infoValue}>{selectedPayment.paymentMethod}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Payment Status:</div>
                  <div style={styles.infoValue}>
                    <span style={styles.statusBadge}>
                      {selectedPayment.paymentStatus}
                    </span>
                  </div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Payment Date:</div>
                  <div style={styles.infoValue}>
                    {new Date(selectedPayment.paymentDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div style={styles.modalSection}>
                <h2 style={styles.sectionTitle}>Policy Information</h2>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Policy Name:</div>
                  <div style={styles.infoValue}>{selectedPayment.proposal.policy.policyName}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Policy ID:</div>
                  <div style={styles.infoValue}>{selectedPayment.proposal.policy.policyId}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Coverage Period:</div>
                  <div style={styles.infoValue}>
                    {selectedPayment.proposal.policy.startDate} to {selectedPayment.proposal.policy.endDate}
                  </div>
                </div>
              </div>
              
              <div style={styles.modalSection}>
                <h2 style={styles.sectionTitle}>Vehicle Information</h2>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Vehicle Type:</div>
                  <div style={styles.infoValue}>{selectedPayment.proposal.vehicleType}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Vehicle Model:</div>
                  <div style={styles.infoValue}>{selectedPayment.proposal.vehicleModel}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Registration Number:</div>
                  <div style={styles.infoValue}>{selectedPayment.proposal.registrationNumber}</div>
                </div>
                <div style={styles.infoRow}>
                  <div style={styles.infoLabel}>Manufacture Year:</div>
                  <div style={styles.infoValue}>{selectedPayment.proposal.manufactureYear}</div>
                </div>
              </div>

              <div style={styles.buttonContainer}>
                <button 
                  style={styles.downloadButton}
                  onClick={handleDownloadReceipt}
                >
                  Download Receipt
                </button>
                <button 
                  style={{
                    ...styles.viewButton,
                    backgroundColor: '#2196F3',
                    color: 'white',
                    ':hover': {
                      backgroundColor: '#0b7dda'
                    }
                  }}
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerViewPayment;