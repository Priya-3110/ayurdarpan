import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link

const FullScreenWellness = () => {
  const [hoverMedicine, setHoverMedicine] = useState(false);
  const [hoverYoga, setHoverYoga] = useState(false);

  const styles = {
    section: {
      minHeight: '120vh', // Increased from 100vh to 120vh
      width: '100%',
      background: 'linear-gradient(135deg, #f5f9e9 0%, #d8e8d2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      color: '#2E7D32',
      padding: '20px',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1200px',
      textAlign: 'center',
      padding: '60px', // Increased padding for more internal space
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: '700',
      marginBottom: '40px', // Increased margin for more spacing
      lineHeight: '1.2',
      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    },
    subtitle: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
      marginBottom: '80px', // Increased margin for more spacing
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto 80px', // Increased margin for more spacing
      color: '#388E3C',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
    },
    medicineButton: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      color: 'white',
      border: 'none',
      padding: hoverMedicine ? '20px 40px' : '18px 36px',
      borderRadius: '50px',
      fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
      transform: hoverMedicine ? 'scale(1.08)' : 'scale(1)',
    },
    yogaButton: {
      background: 'transparent',
      color: hoverYoga ? '#4CAF50' : '#2E7D32',
      border: `3px solid ${hoverYoga ? '#4CAF50' : '#2E7D32'}`,
      padding: '18px 36px',
      borderRadius: '50px',
      fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: hoverYoga ? '0 6px 15px rgba(76, 175, 80, 0.3)' : 'none',
      transform: hoverYoga ? 'scale(1.05)' : 'scale(1)',
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;
          }
        `}
      </style>
      
      <section style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.title}>Ancient Wisdom for Modern Wellness</h1>
          <p style={styles.subtitle}>
            Discover the transformative power of Ayurveda with our curated collection of authentic medicines, healing practices, and time-tested wisdom.
          </p>
          
          <div style={styles.buttonContainer}>
              <Link
              to="/medicines"
               style={{
                ...styles.medicineButton,
                textDecoration: "none",}}
              onMouseEnter={() => setHoverMedicine(true)}
              onMouseLeave={() => setHoverMedicine(false)}
            >
              Explore Medicines →
            </Link>
            <Link
              to="/yoga"
              style={{
                ...styles.yogaButton,
                textDecoration: "none",}}
              onMouseEnter={() => setHoverYoga(true)}
              onMouseLeave={() => setHoverYoga(false)}
            >
              Start Yoga Journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FullScreenWellness;