import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerAppBar from './CustomerAppBar';

const CustomerMyProposals = () => {

  const [proposals, setProposals] = useState([]); // Changed to array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null); // Track which proposal is selected for details
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/proposal/get-one-cusotmer', {
          headers: { "Authorization": "Bearer " + token }
        });
        setProposals(response.data);
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

    fetchProposals();
  }, [navigate]);

  const styles = {

    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Segoe UI", Roboto, sans-serif'
    },
    proposalsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    summaryCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      borderLeft: '4px solid #4CAF50',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    },
    summaryTitle: {
      color: '#222',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    summaryStatus: (status) => ({
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '12px',
      backgroundColor: status ? '#4CAF50' : '#F44336',
      color: 'white'
    }),
    summaryDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '15px',
      marginTop: '15px'
    },
    summaryItem: {
      marginBottom: '5px'
    },
    summaryLabel: {
      fontSize: '12px',
      color: '#777',
      fontWeight: '500'
    },
    summaryValue: {
      fontSize: '14px',
      color: '#222',
      fontWeight: '500'
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
    header: {
      color: '#222',
      textAlign: 'center',
      marginBottom: '30px',
      paddingBottom: '15px',
      borderBottom: '3px solid #ffc107'
    },
    section: {
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee'
    },
    sectionTitle: {
      color: '#ffc107',
      fontSize: '18px',
      marginBottom: '15px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center'
    },
    infoRow: {
      display: 'flex',
      marginBottom: '12px'
    },
    label: {
      width: '200px',
      fontWeight: '600',
      color: '#555'
    },
    value: {
      flex: 1,
      color: '#222'
    },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '5px 10px',
      borderRadius: '20px',
      fontWeight: '600',
      backgroundColor: status ? '#4CAF50' : '#F44336',
      color: 'white'
    }),
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

  if (loading) {
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
        <div style={styles.noProposals}>No proposals found</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerAppBar />
      <div style={styles.container}>
        <div style={styles.proposalsContainer}>
          {proposals.map((proposal) => (
            <div 
              key={proposal.proposalId}
              style={styles.summaryCard} 
              onClick={() => setSelectedProposal(proposal)}>
              <div style={styles.summaryTitle}>
                <span>Proposal #{proposal.proposalId}</span>
                <span style={styles.summaryStatus(proposal.proposalStatus)}>
                  {proposal.proposalStatus ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <div style={styles.summaryDetails}>
                <div style={styles.summaryItem}>
                  <div style={styles.summaryLabel}>Vehicle</div>
                  <div style={styles.summaryValue}>{proposal.vehicleType} - {proposal.vehicleModel}</div>
                </div>

                <div style={styles.summaryItem}>
                  <div style={styles.summaryLabel}>Policy</div>
                  <div style={styles.summaryValue}>{proposal.policy.policyName}</div>
                </div>

                <div style={styles.summaryItem}>
                  <div style={styles.summaryLabel}>Premium</div>
                  <div style={styles.summaryValue}>₹{proposal.policy.premiumAmount}</div>
                </div>

                <div style={styles.summaryItem}>
                  <div style={styles.summaryLabel}>Submitted</div>
                  <div style={styles.summaryValue}>
                    {new Date(proposal.submittedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProposal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <button style={styles.closeButton} onClick={() => setSelectedProposal(null)}> × </button> 
              <h1 style={styles.header}>Proposal Details</h1>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Proposal Information</h2>
                <div style={styles.infoRow}>
                  <div style={styles.label}>Proposal ID:</div>
                  <div style={styles.value}>{selectedProposal.proposalId}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Status:</div>
                  <div style={styles.value}>
                    <span style={styles.statusBadge(selectedProposal.proposalStatus)}>
                      {selectedProposal.proposalStatus ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Submitted Date:</div>
                  <div style={styles.value}>
                    {new Date(selectedProposal.submittedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Vehicle Information</h2>
                <div style={styles.infoRow}>
                  <div style={styles.label}>Vehicle Type:</div>
                  <div style={styles.value}>{selectedProposal.vehicleType}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Vehicle Model:</div>
                  <div style={styles.value}>{selectedProposal.vehicleModel}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Registration Number:</div>
                  <div style={styles.value}>{selectedProposal.registrationNumber}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Manufacture Year:</div>
                  <div style={styles.value}>{selectedProposal.manufactureYear}</div>
                </div>
              </div>
              
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Policy Details</h2>
                <div style={styles.infoRow}>
                  <div style={styles.label}>Policy Name:</div>
                  <div style={styles.value}>{selectedProposal.policy.policyName}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Policy ID:</div>
                  <div style={styles.value}>{selectedProposal.policy.policyId}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Premium Amount:</div>
                  <div style={styles.value}>₹{selectedProposal.policy.premiumAmount}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Coverage Period:</div>
                  <div style={styles.value}>
                    {selectedProposal.policy.startDate} to {selectedProposal.policy.endDate}
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Policy Status:</div>
                  <div style={styles.value}>
                    <span style={styles.statusBadge(selectedProposal.policy.policyStatus === 'ACTIVE')}>
                      {selectedProposal.policy.policyStatus}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Customer Information</h2>
                <div style={styles.infoRow}>
                  <div style={styles.label}>Customer Name:</div>
                  <div style={styles.value}>{selectedProposal.customer.customerName}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Email:</div>
                  <div style={styles.value}>{selectedProposal.customer.user.username}</div>
                </div>

                <div style={styles.infoRow}>
                  <div style={styles.label}>Address:</div>
                  <div style={styles.value}>{selectedProposal.customer.customerAddress}</div>
                </div>
                
                <div style={styles.infoRow}>
                  <div style={styles.label}>Date of Birth:</div>
                  <div style={styles.value}>
                    {selectedProposal.customer.customerDob} (Age: {selectedProposal.customer.customerAge})
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMyProposals;