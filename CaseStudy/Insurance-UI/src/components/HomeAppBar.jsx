import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeAppBar = () => {

  const navigate = useNavigate();
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const insurancePlans = [

    'Two-Wheeler Basic Coverage',
    'Heavy Vehicle Full Protection',
    'Comprehensive Bike Insurance',
    'Comprehensive Car Insurance',
    'Third Party Car Insurance',
    'Four-Wheeler Basic Coverage',
    'Comprehensive Truck Insurance',
    'Truck Third-Party Coverage',
    'Comprehensive Campervan Insurance',
    'Campervan Basic Coverage',
    'Third Party CamperVan Insurance'
  ];

  const aboutUsSections = [
    'Our History',
    'Mission & Values',
    'Leadership Team',
    'Awards & Recognition'
  ];

  const contactOptions = [
    'Customer Service: 1800-123-4567',
    'Claims Department: 1800-765-4321',
    'Email: contact@policyinsurance.com',
    'Head Office Address'
  ];

  return (

    <header style={styles.appBar}>
      <div style={styles.logo} onClick={() => navigate('/')}> POLICY INSURANCE COMPANY </div>
      <nav style={styles.nav}>
        
        {/* Insurance Plans Dropdown */}
        <div style={styles.dropdownContainer}>
          <button 
            style={styles.navButton} 
            onMouseEnter={() => setShowPlansDropdown(true)}
            onMouseLeave={() => setShowPlansDropdown(false)}
            onClick={() => setShowPlansDropdown(!showPlansDropdown)}> Insurance Plans </button>
          {showPlansDropdown && (
            <div 
              style={styles.dropdownContent}
              onMouseEnter={() => setShowPlansDropdown(true)}
              onMouseLeave={() => setShowPlansDropdown(false)}>
              {insurancePlans.map((plan, index) => (
                <div 
                  key={index} 
                  style={styles.dropdownItem}
                  onClick={() => {
                    setShowPlansDropdown(false);
                  }}>
                  {plan}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About Us Dropdown */}
        <div style={styles.dropdownContainer}>
          <button 
            style={styles.navButton}
            onMouseEnter={() => setShowAboutDropdown(true)}
            onMouseLeave={() => setShowAboutDropdown(false)}
            onClick={() => setShowAboutDropdown(!showAboutDropdown)}> About Us </button>
          {showAboutDropdown && (
            <div 
              style={styles.dropdownContent}
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}>
              <div style={styles.dropdownHeader}>About Our Company</div>
              <div style={styles.dropdownText}>
                Founded in 1995, Policy Insurance Company has been providing reliable coverage to millions of customers nationwide.
              </div>
              {aboutUsSections.map((section, index) => (
                <div 
                  key={index} 
                  style={styles.dropdownItem}
                  onClick={() => {
                    setShowAboutDropdown(false);
                  }}>
                  {section}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Dropdown */}
        <div style={styles.dropdownContainer}>
          <button 
            style={styles.navButton}
            onMouseEnter={() => setShowContactDropdown(true)}
            onMouseLeave={() => setShowContactDropdown(false)}
            onClick={() => setShowContactDropdown(!showContactDropdown)}> Contact </button>
          {showContactDropdown && (
            <div 
              style={styles.dropdownContent}
              onMouseEnter={() => setShowContactDropdown(true)}
              onMouseLeave={() => setShowContactDropdown(false)}>
              <div style={styles.dropdownHeader}>Get in Touch</div>
              <div style={styles.dropdownText}>
                We're available 24/7 to assist you with all your insurance needs.
              </div>
              {contactOptions.map((option, index) => (
                <div 
                  key={index} 
                  style={styles.dropdownItem}
                  onClick={() => {
                    setShowContactDropdown(false);
                  }}>
                  {option}
                </div>
              ))}
              <div style={styles.socialIcons}>
                <span style={styles.icon} onClick={() => window.open('https://facebook.com')}>📱</span>
                <span style={styles.icon} onClick={() => window.open('https://twitter.com')}>🐦</span>
                <span style={styles.icon} onClick={() => window.open('https://linkedin.com')}>👔</span>
              </div>
            </div>
          )}
        </div>

        <button style={styles.signupButton} onClick={() => navigate('/signup')}> Sign Up </button>
        <button style={styles.loginButton} onClick={() => navigate('/login')}> Login </button>
      </nav>
    </header>
  );
};

// Updated Style CSS with additional dropdown styles
const styles = {

  appBar: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fbbf24',
    letterSpacing: '0.5px'
  },
  nav: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    position: 'relative'
  },
  navButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#34495e'
    }
  },
  loginButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
    marginLeft: '10px',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  },
  signupButton: {
    backgroundColor: '#fbbf24',
    color: '#000000',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#f59e0b'
    }
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  dropdownContent: {
    position: 'absolute',
    backgroundColor: '#fff',
    minWidth: '250px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    borderRadius: '4px',
    overflow: 'hidden',
    top: '100%',
    left: 0,
    border: '1px solid #ddd'
  },
  dropdownHeader: {
    color: '#2c3e50',
    padding: '12px 16px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
    fontSize: '15px'
  },
  dropdownText: {
    color: '#666',
    padding: '12px 16px',
    fontSize: '14px',
    borderBottom: '1px solid #eee'
  },
  dropdownItem: {
    color: '#333',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#f1f1f1'
    }
  },
  socialIcons: {
    display: 'flex',
    padding: '12px 16px',
    gap: '15px',
    borderTop: '1px solid #eee'
  },
  icon: {
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.2)'
    }
  }
};

export default HomeAppBar;