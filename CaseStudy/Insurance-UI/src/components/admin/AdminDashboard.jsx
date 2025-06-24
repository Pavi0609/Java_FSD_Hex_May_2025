import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from './AdminAppbar';

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
    const routeMap = {
      'View Proposals': 'proposals',
      'View Quotes': 'quotes',
      'View Claims': 'claims',
      'View Payments': 'payments',
      'View Reviews': 'reviews',
      'View Policies': 'policies',
      'View Policy Add-Ons': 'policy-addons'
    };
    
    const path = routeMap[cardName] || 'dashboard';
    navigate(`/admin/${path}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <main className="main-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading admin data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <main className="main-content">
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>         
      <AdminAppBar />
      <div className="dashboard-container">
        <main className="main-content">
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome back, <span>{adminData?.adminName || 'Admin'}</span>!
            </h1>
            <p className="welcome-subtitle">What would you like to manage today?</p>
          </div>
          
          <div className="cards-container">
            {[
              { name: 'View Proposals', icon: '📋', color: '#4e73df' },
              { name: 'View Quotes', icon: '💲', color: '#1cc88a' },
              { name: 'View Claims', icon: '⚠️', color: '#e74a3b' },
              { name: 'View Payments', icon: '💰', color: '#f6c23e' },
              { name: 'View Reviews', icon: '⭐', color: '#36b9cc' },
              { name: 'View Policies', icon: '🛡️', color: '#9b59b6' },
              { name: 'View Policy Add-Ons', icon: '➕', color: '#9b59b6' }
            ].map((card) => (
              <div 
                key={card.name}
                className="dashboard-card" 
                onClick={() => handleCardClick(card.name)}
                style={{ '--card-color': card.color }}
              >
                <div className="card-icon">{card.icon}</div>
                <h3 className="card-title">{card.name}</h3>
                <p className="card-text">Manage {card.name.replace('View ', '')}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// CSS Styles
const styles = `
  :root {
    --primary-color: #4e73df;
    --secondary-color: #1cc88a;
    --danger-color: #e74a3b;
    --warning-color: #f6c23e;
    --info-color: #36b9cc;
    --policy-color: #9b59b6;
    --dark-color: #5a5c69;
    --light-color: #f8f9fc;
    --gray-color: #dddfeb;
    --white: #ffffff;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .dashboard-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--light-color);
  }

  .main-content {
    padding: 2rem;
    flex: 1;
  }

  .welcome-section {
    margin-bottom: 2rem;
    text-align: center;
  }

  .welcome-title {
    color: var(--dark-color);
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .welcome-title span {
    color: var(--primary-color);
  }

  .welcome-subtitle {
    color: var(--dark-color);
    opacity: 0.8;
    font-size: 1.1rem;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .dashboard-card {
    background-color: var(--white);
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    border-top: 4px solid var(--card-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .dashboard-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--card-color);
  }

  .card-title {
    color: var(--dark-color);
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  .card-text {
    color: var(--dark-color);
    opacity: 0.7;
    font-size: 0.9rem;
  }

  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--gray-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-message {
    background-color: var(--danger-color);
    color: var(--white);
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default AdminDashboard;