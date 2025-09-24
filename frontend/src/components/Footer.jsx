import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: '#2E7D32',
      color: 'white',
      padding: '30px 20px',
      fontFamily: "'Poppins', sans-serif",
      textAlign: 'center',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '1.3rem',
      fontWeight: '700',
    },
    leafIcon: {
      fontSize: '1.5rem',
    },
    tagline: {
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '500px',
      lineHeight: '1.5',
    },
    links: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    link: {
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      fontSize: '0.9rem',
    },
    divider: {
      height: '1px',
      width: '100%',
      maxWidth: '300px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      margin: '15px 0',
    },
    copyright: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.7)',
      flexWrap: 'wrap',
    },
    heart: {
      color: '#ff4d4d',
    },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          
          @media (max-width: 480px) {
            .footer-links {
              flex-direction: column;
              gap: 12px;
            }
          }
        `}
      </style>
      
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.logo}>
              <span style={styles.leafIcon}>🌿</span>
              <span>Ayurvedic Wellness</span>
            </div>
            
            <p style={styles.tagline}>
              Embracing ancient wisdom for modern wellbeing
            </p>
            
            <div style={styles.links} className="footer-links">
              <a href="#" style={styles.link}>Home</a>
              <a href="#" style={styles.link}>About</a>
              <a href="#" style={styles.link}>Services</a>
              <a href="#" style={styles.link}>Products</a>
              <a href="#" style={styles.link}>Contact</a>
            </div>
            
            <div style={styles.divider}></div>
            
            <div style={styles.copyright}>
              <span>© {currentYear} Ayurvedic Wellness</span>
              <span>•</span>
              <span>Made with <span style={styles.heart}>❤</span> for holistic health</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;