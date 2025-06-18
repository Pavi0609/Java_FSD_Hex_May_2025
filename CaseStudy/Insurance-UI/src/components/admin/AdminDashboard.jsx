import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminAppBar from './AdminAppBar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8080/api/admin/get-one-username', {
          headers: { "Authorization": "Bearer " + token }
        });
        
        setAdminData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleCardClick = (cardName) => {
    // Map card names to their respective routes
    const routeMap = {
      'View Proposals': 'proposals',
      'View Quotes': 'quotes',
      'View Claims': 'claims',
      'View Reviews': 'reviews'
    };
    
    const path = routeMap[cardName] || 'dashboard';
    navigate(`/admin/${path}`);
  };

  if (loading) {
    return (
      <div style={styles.dashboardContainer}>
        <main style={styles.mainContent}>
          <div style={styles.contentBox}>
            <p>Loading admin data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.dashboardContainer}>
        <main style={styles.mainContent}>
          <div style={styles.contentBox}>
            <p style={{ color: 'red' }}>Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>         
      <AdminAppBar />
      <div style={styles.dashboardContainer}>
        <main style={styles.mainContent}>
          <h1 style={styles.title}>
            Welcome to Admin Dashboard, {adminData?.adminName || 'Admin'}!
          </h1>
          <br />
          <div style={styles.cardsContainer}>
            {['View Proposals', 'View Quotes', 'View Claims', 'View Reviews'].map((card) => (
              <div 
                key={card}
                style={styles.card} 
                onClick={() => handleCardClick(card)}
              >
                <h3 style={styles.cardTitle}> {card} </h3>
                <p style={styles.cardText}>Click to navigate to {card}'s page</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Style.CSS
const styles = {
  dashboardContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    padding: '20px',
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '40px',
    marginTop: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    }
  },
  cardTitle: {
    color: '#2c3e50',
    marginBottom: '10px'
  },
  cardText: {
    color: '#7f8c8d'
  },
  contentBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};

export default AdminDashboard;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminAppBar from './AdminAppBar';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8080/api/admin/get-one-username', {
          headers: { "Authorization" : "Bearer " + token }
        });
        
        setAdminData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div style={styles.dashboardContainer}>
        <main style={styles.mainContent}>
          <div style={styles.contentBox}>
            <p>Loading admin data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.dashboardContainer}>
        <main style={styles.mainContent}>
          <div style={styles.contentBox}>
            <p style={{ color: 'red' }}>Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>         
        <AdminAppBar />

    <div style={styles.dashboardContainer}>
    
      <main style={styles.mainContent}>
        <h1 style={styles.title}>
          Welcome to Admin Dashboard, {adminData?.adminName || 'Admin'}!
        </h1>
        <div style={styles.contentBox}>
          <p>This is your admin dashboard content area.</p>
          <p>You can add charts, statistics, or other admin features here.</p>
        </div>
      </main>
    </div>
    </div>
  );
};

// Additional styles for the dashboard
const styles = {
  dashboardContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    padding: '20px',
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px'
  },
  contentBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  adminInfo: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    borderLeft: '4px solid #2c3e50'
  }
};

export default AdminDashboard;
*/