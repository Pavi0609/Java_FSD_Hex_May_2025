import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies } from '../../store/actions/PolicyAction';
import AdminAppBar from '../admin/AdminAppBar';

function Policy() {
  const dispatch = useDispatch();
  const { policies, loading, error } = useSelector(state => state.policy);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

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
        <div style={styles.policyGrid}>
          {policies.map((policy) => (
            <div key={policy.policyId} style={styles.policyCard}>
              <h3 style={styles.policyName}>{policy.policyName}</h3>
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
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  policyName: {
    color: '#3498db',
    marginTop: '0',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  policyDetails: {
    lineHeight: '1.6'
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
  }
};

export default Policy;