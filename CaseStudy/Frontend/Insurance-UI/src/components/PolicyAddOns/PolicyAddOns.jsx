import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../admin/AdminAppbar';

function PolicyAddOns() {
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        const response = await axios.get('http://localhost:8080/api/policy-addons/get-all', {
          headers: { "Authorization": "Bearer " + token }
        });
        setAddOns(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching policy add-ons:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchAddOns();
  }, []);

  const handleDelete = async (addonId) => {
    try {
      setDeletingId(addonId);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.delete(`http://localhost:8080/api/policy-addons/delete/${addonId}`, {
        headers: { "Authorization": "Bearer " + token }
      });
      // Remove the deleted addon from state
      setAddOns(addOns.filter(addOn => addOn.addonId !== addonId));
    } catch (err) {
      console.error("Error deleting addon:", err);
      setError(err.response?.data?.message || 'Failed to delete addon');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminAppBar />
        <div style={styles.loading}>Loading policy add-ons...</div>
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
        <h1 style={styles.header}>Policy Add-Ons</h1>
        {addOns.length === 0 ? (
          <div style={styles.emptyMessage}>No policy add-ons found</div>
        ) : (
          <div style={styles.addOnsGrid}>
            {addOns.map((addOn) => (
              <div key={addOn.addonId} style={styles.addOnCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.addOnName}>{addOn.addonName}</h3>
                  <span style={styles.priceTag}>+ ₹{addOn.additionalPremium.toFixed(2)}</span>
                </div>
                
                <div style={styles.policyInfo}>
                  <p style={styles.policyName}>{addOn.policy.policyName}</p>
                  <p style={styles.policyId}>Policy ID: {addOn.policy.policyId}</p>
                </div>
                
                <p style={styles.description}>{addOn.description}</p>
                
                <div style={styles.statusContainer}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: addOn.policy.policyStatus === 'ACTIVE' ? '#28a745' : '#dc3545'
                  }}>
                    {addOn.policy.policyStatus}
                  </span>
                  <span style={styles.validity}>
                    {new Date(addOn.policy.startDate).toLocaleDateString()} - {new Date(addOn.policy.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div style={styles.actionsContainer}>
                  <button style={styles.deleteButton} onClick={() => handleDelete(addOn.addonId)} disabled={deletingId === addOn.addonId}>
                    {deletingId === addOn.addonId ? (
                      <span style={styles.buttonContent}>
                        <span style={styles.spinner}></span> Deleting...
                      </span>
                    ) : (
                      <span style={styles.buttonContent}>
                        <span style={styles.trashIcon}>&#128465;</span> Delete
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2rem'
  },
  addOnsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  },
  addOnCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px'
  },
  addOnName: {
    color: '#3498db',
    margin: '0',
    fontSize: '1.5rem'
  },
  priceTag: {
    backgroundColor: '#f8f9fa',
    color: '#28a745',
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  policyInfo: {
    marginBottom: '15px'
  },
  policyName: {
    fontWeight: 'bold',
    color: '#495057',
    margin: '0 0 5px 0'
  },
  policyId: {
    color: '#6c757d',
    fontSize: '0.9rem',
    margin: '0'
  },
  description: {
    color: '#343a40',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  statusBadge: {
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  validity: {
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#495057'
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    color: '#dc3545',
    fontSize: '18px'
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#6c757d',
    fontSize: '1.1rem'
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '10px',
    borderTop: '1px solid #eee'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#c82333'
    },
    ':disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    }
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  trashIcon: {
    fontSize: '1rem'
  },
  spinner: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
    marginRight: '5px'
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' }
  }
};

export default PolicyAddOns;