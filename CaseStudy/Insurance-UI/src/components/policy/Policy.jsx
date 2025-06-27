import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies, deletePolicy } from '../../store/actions/PolicyAction';
import AdminAppBar from '../admin/AdminAppbar';

function Policy() {

  const dispatch = useDispatch();
  const { policies, loading, error, deleteLoading, deleteError } = useSelector(state => state.policy);

  useEffect(() => {

    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleDelete = async (policyId) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      try {
        await dispatch(deletePolicy(policyId));
        // The fetchPolicies will be called automatically after successful deletion
      } catch (error) {
        console.error("Error deleting policy:", error);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <AdminAppBar />
        <div style={styles.loading}>Loading policies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminAppBar />
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div>       
      <AdminAppBar />
      <div style={styles.container}>
        <h1 style={styles.header}>Insurance Policies</h1>
        {deleteError && <div style={styles.deleteError}>Delete Error: {deleteError}</div>}
        <div style={styles.policyGrid}>
          {policies.map((policy) => (
            <div key={policy.policyId} style={styles.policyCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.policyName}>{policy.policyName}</h3>
                <button onClick={() => handleDelete(policy.policyId)} style={styles.deleteButton} disabled={deleteLoading}>
                  <svg 
                    style={styles.deleteIcon} 
                    viewBox="0 0 24 24" 
                    width="16" 
                    height="16" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round">

                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
              
              <div style={styles.policyDetails}>
                <p><strong>ID:</strong> {policy.policyId}</p>
                <p><strong>Premium:</strong> ₹{policy.premiumAmount.toLocaleString()}</p>
                <p style={{ 
                  color: policy.policyStatus === 'ACTIVE' ? 'green' : 'red',
                  fontWeight: 'bold'
                }}>
                  <strong>Status:</strong> {policy.policyStatus}
                </p>
                <p><strong>Coverage Period:</strong></p>
                <p>{new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px'
  },
  policyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  policyCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '20px',
    transition: 'transform 0.2s',
    position: 'relative',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  policyName: {
    color: '#3498db',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    flex: 1
  },
  policyDetails: {
    lineHeight: '1.6'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#cc0000'
    },
    ':disabled': {
      backgroundColor: '#ff9999',
      cursor: 'not-allowed'
    }
  },
  deleteIcon: {
    verticalAlign: 'middle'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px'
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    color: 'red',
    fontSize: '18px'
  },
  deleteError: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center'
  }
};

export default Policy;