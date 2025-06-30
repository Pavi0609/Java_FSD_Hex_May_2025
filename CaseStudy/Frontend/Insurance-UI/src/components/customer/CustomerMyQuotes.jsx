import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerAppBar from './CustomerAppBar';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const CustomerMyQuotes = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // Fetch all proposals for the customer
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/proposal/get-one-cusotmer',{ 
          headers: { "Authorization": "Bearer " + token }
        });
        setProposals(response.data);
        // Select the first proposal by default if available
        if (response.data.length > 0) {
          setSelectedProposalId(response.data[0].proposalId);
        } else {
          setError('No proposals found for this customer');
          setLoading(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchProposals();
  }, [navigate]);

  // Fetch quote when proposalId is selected
  useEffect(() => {
    if (!selectedProposalId) return;
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/quote/get-one/proposal/${selectedProposalId}`, { 
          headers: { "Authorization": "Bearer " + token }
        });
        setQuote(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchQuote();
  }, [selectedProposalId, navigate]);

  const handleProposalChange = (e) => {
    setSelectedProposalId(Number(e.target.value));
  };

  const handleDownloadPDF = () => {
    if (!quote) return;
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Insurance Quote', 105, 20, { align: 'center' });
    
    // Quote details
    doc.setFontSize(12);
    doc.text(`Quote ID: ${quote.quoteId}`, 14, 30);
    doc.text(`Generated Date: ${new Date(quote.generatedDate).toLocaleDateString()}`, 14, 36);
    
    // Premium Amount
    doc.setFontSize(16);
    doc.setTextColor(255, 193, 7);
    doc.text(`Premium Amount: ₹${quote.premiumAmount}`, 105, 45, { align: 'center' });
    
    // Vehicle Information
    doc.setTextColor(40, 40, 40);
    doc.text('Vehicle Information', 14, 60);
    autoTable(doc, {
      startY: 65,
      head: [['Type', 'Model', 'Registration', 'Year']],
      body: [[
        quote.proposal.vehicleType,
        quote.proposal.vehicleModel,
        quote.proposal.registrationNumber,
        quote.proposal.manufactureYear
      ]],
      theme: 'grid',
      headStyles: { fillColor: [40, 40, 40] }
    });
    
    // Policy Information
    doc.text('Policy Information', 14, doc.lastAutoTable.finalY + 15);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Policy Name', 'Coverage Period', 'Original Premium']],
      body: [[
        quote.proposal.policy.policyName,
        `${quote.proposal.policy.startDate} to ${quote.proposal.policy.endDate}`,
        `₹${quote.proposal.policy.premiumAmount}`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [40, 40, 40] }
    });
    
    // Validity
    doc.text(`Validity Period: ${quote.validityPeriod} days`, 14, doc.lastAutoTable.finalY + 15);
    doc.save(`insurance-quote-${quote.quoteId}.pdf`);
  };

  const handlePayment = () => {
    navigate('/addPayment', { 
      state: { 
        quoteId: quote.quoteId, 
        amount: quote.premiumAmount,
        proposalId: quote.proposal.proposalId
      } 
    });
  };

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Segoe UI", Roboto, sans-serif'
    },
    dropdownContainer: {
      maxWidth: '800px',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
    },
    dropdownLabel: {
      marginRight: '10px',
      fontWeight: '500',
      color: '#555',
    },
    dropdown: {
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      flex: 1,
    },
    quoteCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      borderLeft: '4px solid #ffc107',
      transition: 'all 0.3s',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    },
    quoteHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    },
    quoteTitle: {
      color: '#222',
      fontSize: '18px',
      fontWeight: '600'
    },
    quoteId: {
      color: '#777',
      fontSize: '14px'
    },
    quoteDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '15px',
      marginBottom: '15px'
    },
    quoteItem: {
      marginBottom: '5px'
    },
    quoteLabel: {
      fontSize: '12px',
      color: '#777',
      fontWeight: '500'
    },
    quoteValue: {
      fontSize: '14px',
      color: '#222',
      fontWeight: '500'
    },
    premiumAmount: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffc107',
      textAlign: 'right'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
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
      flex: 1,
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
      flex: 1,
      ':hover': {
        backgroundColor: '#45a049'
      }
    },
    paymentButton: {
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      flex: 1,
      ':hover': {
        backgroundColor: '#0b7dda'
      }
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      color: '#666666',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      fontWeight: '500',
      flex: 1,
      cursor: 'not-allowed'
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
    statusBadge: {
      display: 'inline-block',
      padding: '5px 10px',
      borderRadius: '20px',
      fontWeight: '600',
      backgroundColor: '#4CAF50',
      color: 'white'
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
    noProposals: {
      textAlign: 'center',
      padding: '40px',
      color: '#555'
    }
  };

  if (loading && proposals.length === 0) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.loading}>Loading proposals...</div>
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

  if (proposals.length === 0) {
    return (
      <div>
        <CustomerAppBar />
        <div style={styles.noProposals}>No proposals found for this customer</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerAppBar />
      <div style={styles.container}>
        {/* Proposal selection dropdown */}
        {proposals.length > 1 && (
          <div style={styles.dropdownContainer}>
            <label htmlFor="proposal-select" style={styles.dropdownLabel}> Select Proposal: </label>
            <select
              id="proposal-select"
              value={selectedProposalId || ''}
              onChange={handleProposalChange}
              style={styles.dropdown}
              disabled={loading}>
              {proposals.map((proposal) => (
                <option key={proposal.proposalId} value={proposal.proposalId}>
                  Proposal #{proposal.proposalId} - {proposal.vehicleType} ({proposal.vehicleModel})
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div style={styles.loading}>Loading quote details...</div>
        ) : quote ? (
          <>
            <div style={styles.quoteCard}>
              <div style={styles.quoteHeader}>
                <div>
                  <div style={styles.quoteTitle}>Insurance Quote</div>
                  <div style={styles.quoteId}>Quote ID: {quote.quoteId}</div>
                </div>
                <div style={styles.premiumAmount}>₹{quote.premiumAmount}</div>
              </div>
              
              <div style={styles.quoteDetails}>
                <div style={styles.quoteItem}>
                  <div style={styles.quoteLabel}>Vehicle</div>
                  <div style={styles.quoteValue}>
                    {quote.proposal.vehicleType} - {quote.proposal.vehicleModel}
                  </div>
                </div>
                
                <div style={styles.quoteItem}>
                  <div style={styles.quoteLabel}>Policy</div>
                  <div style={styles.quoteValue}>{quote.proposal.policy.policyName}</div>
                </div>

                <div style={styles.quoteItem}>
                  <div style={styles.quoteLabel}>Generated Date</div>
                  <div style={styles.quoteValue}>
                    {new Date(quote.generatedDate).toLocaleDateString()}
                  </div>
                </div>

                <div style={styles.quoteItem}>
                  <div style={styles.quoteLabel}>Validity</div>
                  <div style={styles.quoteValue}>{quote.validityPeriod} days</div>
                </div>
              </div>
              
              <div style={styles.buttonContainer}>
                <button style={styles.viewButton} onClick={() => setShowDetails(true)}> View Details </button>
                <button style={styles.downloadButton} onClick={handleDownloadPDF}> Download PDF </button>
                {quote?.proposal?.proposalStatus ? (
                  <button style={styles.paymentButton} onClick={handlePayment}> Make Payment </button>
                ) : (
                  <button style={styles.disabledButton} disabled> Payment Unavailable </button>
                )}
              </div>
            </div>

            {showDetails && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  <button style={styles.closeButton} onClick={() => setShowDetails(false)}> × </button>
          
                  <h1 style={styles.modalHeader}>Quote Details</h1>
                  
                  <div style={styles.modalSection}>
                    <h2 style={styles.sectionTitle}>Quote Information</h2>
                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Quote ID:</div>
                      <div style={styles.infoValue}>{quote.quoteId}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Premium Amount:</div>
                      <div style={styles.infoValue}>₹{quote.premiumAmount}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Generated Date:</div>
                      <div style={styles.infoValue}>
                        {new Date(quote.generatedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Validity Period:</div>
                      <div style={styles.infoValue}>{quote.validityPeriod} days</div>
                    </div>
                  </div>
                  
                  <div style={styles.modalSection}>
                    <h2 style={styles.sectionTitle}>Vehicle Information</h2>
                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Vehicle Type:</div>
                      <div style={styles.infoValue}>{quote.proposal.vehicleType}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Vehicle Model:</div>
                      <div style={styles.infoValue}>{quote.proposal.vehicleModel}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Registration Number:</div>
                      <div style={styles.infoValue}>{quote.proposal.registrationNumber}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Manufacture Year:</div>
                      <div style={styles.infoValue}>{quote.proposal.manufactureYear}</div>
                    </div>
                  </div>
                  
                  <div style={styles.modalSection}>
                    <h2 style={styles.sectionTitle}>Policy Details</h2>
                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Policy Name:</div>
                      <div style={styles.infoValue}>{quote.proposal.policy.policyName}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Policy ID:</div>
                      <div style={styles.infoValue}>{quote.proposal.policy.policyId}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Original Premium:</div>
                      <div style={styles.infoValue}>₹{quote.proposal.policy.premiumAmount}</div>
                    </div>

                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Coverage Period:</div>
                      <div style={styles.infoValue}>
                        {quote.proposal.policy.startDate} to {quote.proposal.policy.endDate}
                      </div>
                    </div>
                    
                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}>Policy Status:</div>
                      <div style={styles.infoValue}>
                        <span style={styles.statusBadge}>
                          {quote.proposal.policy.policyStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={styles.error}>No quote available for the selected proposal</div>
        )}
      </div>
    </div>
  );
};

export default CustomerMyQuotes;