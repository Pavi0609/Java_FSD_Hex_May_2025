import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminAppBar from '../admin/AdminAppbar';

const ViewCustomer = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8080/api/customer/get-all', {
          headers: { "Authorization": "Bearer " + token }
        });
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div>
        <AdminAppBar />
        <div style={styles.loading}>Loading customers...</div>
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
        <h1 style={styles.header}>Customer Management</h1>
        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Customer Name</th>
                <th style={styles.tableHeader}>Address</th>
                <th style={styles.tableHeader}>Date of Birth</th>
                <th style={styles.tableHeader}>Age</th>
                <th style={styles.tableHeader}>Aadhar No</th>
                <th style={styles.tableHeader}>PAN No</th>
                <th style={styles.tableHeader}>Email</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{customer.id}</td>
                  <td style={styles.tableCell}>{customer.customerName}</td>
                  <td style={styles.tableCell}>{customer.customerAddress}</td>
                  <td style={styles.tableCell}>{new Date(customer.customerDob).toLocaleDateString()}</td>
                  <td style={styles.tableCell}>{customer.customerAge}</td>
                  <td style={styles.tableCell}>{customer.customerAadharNo}</td>
                  <td style={styles.tableCell}>{customer.customerPanNo}</td>
                  <td style={styles.tableCell}>{customer.user.username}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

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
  tableContainer: {
    overflowX: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff'
  },
  tableHeaderRow: {
    backgroundColor: '#3498db',
    color: 'white'
  },
  tableHeader: {
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  tableRow: {
    borderBottom: '1px solid #dddddd',
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  tableCell: {
    padding: '12px 15px',
    fontSize: '0.9rem',
    color: '#333333'
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
  }
};

export default ViewCustomer;