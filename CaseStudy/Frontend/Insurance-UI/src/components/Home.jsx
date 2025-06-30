import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeAppBar from './HomeAppBar';
import carImage from '../assets/car-insurance.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <HomeAppBar />
      {/* Hero Banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Let's find you the <span style={styles.highlight}>Best Auto Insurance</span></h1>
          <div style={styles.heroBullets}>
            <div style={styles.bulletItem}>
              <span style={styles.bulletIcon}>💰</span>
              <span>50+ insurers offering lowest prices</span>
            </div>
            <div style={styles.bulletItem}>
              <span style={styles.bulletIcon}>⚡</span>
              <span>Quick, easy & hassle free</span>
            </div>
          </div>
          <div style={styles.ctaContainer}>
            <button style={styles.primaryButton} onClick={() => navigate('/login')}> Get Instant Quote </button>
            <button style={styles.secondaryButton} onClick={() => navigate('/viewPolicy')}> View all plans → </button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={carImage} alt="Car Illustration" style={styles.carImage} />
        </div>
      </div>

      {/* Quick Claim Banner */}
      <div style={styles.claimBanner}>
        <div style={styles.claimContent}>
          <h2 style={styles.claimTitle}>Accident Repairs Needed?</h2>
          <h3 style={styles.claimSubtitle}>YOU'RE HOW COVERED</h3>
          <p style={styles.claimText}>No need to wait 24-hours for claim anymore!</p>
          <button style={styles.claimButton} onClick={() => navigate('/login')}> Learn about claims → </button>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={styles.whySection}>
        <h2 style={styles.sectionTitle}>What makes us India's favorite auto insurance?</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <h3 style={styles.statNumber}>5M+</h3>
            <p style={styles.statText}>customers trust our auto insurance</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🏢</div>
            <h3 style={styles.statNumber}>50+</h3>
            <p style={styles.statText}>insurers partnered for best rates</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏱</div>
            <h3 style={styles.statNumber}>24/7</h3>
            <p style={styles.statText}>claims support when you need it</p>
          </div>
        </div>
      </div>

      {/* Testimonials or Reviews */}
      <div style={styles.testimonialSection}>
        <h2 style={styles.sectionTitle}>What Our Customers Are Saying</h2>
        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialRating}>★★★★★</div>
            <p style={styles.testimonialText}>"Thanks for quick claim settlement! The process was seamless and got my car repaired in just 2 days. Good to have Policy Insurance."</p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.authorAvatar}>RS</div>
              <div>
                <p style={styles.authorName}>Rahul Sharma</p>
                <p style={styles.authorLocation}>Mumbai</p>
              </div>
            </div>
          </div>
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialRating}>★★★★☆</div>
            <p style={styles.testimonialText}>"You're doing great work. Got the best premium rates compared to other providers. Proud to be a customer."</p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.authorAvatar}>PP</div>
              <div>
                <p style={styles.authorName}>Priya Patel</p>
                <p style={styles.authorLocation}>Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div style={styles.helpSection}>
        <div style={styles.helpContent}>
          <h2 style={styles.helpTitle}>Have a question? We're here to help.</h2>
          <p style={styles.helpText}>
            Our friendly customer support team is your extended family. Speak your heart out. 
            We listen with undivided attention to resolve your concerns.
          </p>
          <div style={styles.contactMethods}>
            <div style={styles.contactItem} onClick={() => window.location.href = 'mailto:care@policyinsurance.com'}>
              <div style={styles.contactIcon}>✉</div>
              <div>
                <p style={styles.contactLabel}>Email us at</p>
                <p style={styles.contactValue}>care@policyinsurance.com</p>
              </div>
            </div>
            <div style={styles.contactItem} onClick={() => window.location.href = 'tel:18002088787'}>
              <div style={styles.contactIcon}>📞</div>
              <div>
                <p style={styles.contactLabel}>Call us at</p>
                <p style={styles.contactValue}>1800-208-8787</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    color: '#1f2937',
    lineHeight: 1.6,
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  heroBanner: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '80px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(135deg, #2c3e50, #1f2937)',
  },
  heroContent: {
    maxWidth: '600px',
    textAlign: 'left',
  },
  heroTitle: {
    color: 'white',
    fontSize: '2.1rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    lineHeight: 1.2,
  },
  highlight: {
    color: '#fbbf24',
    fontSize: '2.5rem'
  },
  heroBullets: {
    margin: '2rem 0',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    fontSize: '1.1rem',
  },
  bulletIcon: {
    fontSize: '1.3rem',
    color: '#fbbf24'
  },
  heroImage: {
    flexShrink: 0,
    width: '500px',
    height: '300px',
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ctaContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  primaryButton: {
    backgroundColor: '#fbbf24',
    color: '#000000',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#f59e0b',
      transform: 'translateY(-2px)'
    },
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid #fbbf24',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
    },
  },
  claimBanner: {
    backgroundColor: '#ffffc5',
    padding: '3rem 2rem',
    margin: '3rem auto',
    maxWidth: '1200px',
    borderRadius: '8px',
    textAlign: 'center',
    borderLeft: '4px solid #fbbf24',
  },
  claimTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  claimSubtitle: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#f59e0b',
    marginBottom: '1rem',
  },
  claimText: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    color: '#4b5563',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  claimButton: {
    backgroundColor: 'transparent',
    color: '#2c3e50',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    ':hover': {
      color: '#f59e0b',
    },
  },
  whySection: {
    backgroundColor: '#f8f9fc',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: '3rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  statIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#fbbf24'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  statText: {
    fontSize: '1rem',
    color: '#4b5563',
  },
  testimonialSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  testimonialCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  testimonialRating: {
    color: '#fbbf24',
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  testimonialText: {
    fontStyle: 'italic',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#4b5563',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  authorAvatar: {
    backgroundColor: '#2c3e50',
    color: '#fbbf24',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
  },
  authorName: {
    fontWeight: 600,
    margin: 0,
    color: '#2c3e50'
  },
  authorLocation: {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: 0,
  },
  helpSection: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  helpContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  helpTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
  },
  helpText: {
    fontSize: '1rem',
    opacity: 0.9,
    marginBottom: '2rem',
  },
  contactMethods: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    padding: '1rem',
    borderRadius: '8px',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
    },
  },
  contactIcon: {
    fontSize: '1.8rem',
    color: '#fbbf24',
  },
  contactLabel: {
    fontSize: '0.9rem',
    opacity: 0.8,
    margin: 0,
    textAlign: 'left',
  },
  contactValue: {
    fontSize: '1.1rem',
    fontWeight: 500,
    margin: 0,
    textAlign: 'left',
    color: '#fbbf24',
  },
};

export default Home;