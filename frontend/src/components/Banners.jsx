import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCapsules,
  faPersonPraying,
  faLeaf,
  faBowlFood,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const WellnessDestinations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Set visible when entering viewport, hide when leaving
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const cardData = [
    {
      title: "Authentic Medicines",
      description: "Discover traditional Ayurvedic medicines crafted with pure herbs and ancient wisdom",
      buttonText: "Explore Now",
      icon: faCapsules
    },
    {
      title: "Yoga Poses",
      description: "Master ancient yoga poses with detailed instructions for mind-body harmony",
      buttonText: "Explore Now",
      icon: faPersonPraying
    },
    {
      title: "Natural Remedies",
      description: "Time-tested home remedies using natural ingredients from your kitchen",
      buttonText: "Explore Now",
      icon: faLeaf
    },
    {
      title: "Healing Recipes",
      description: "Nourishing Ayurvedic recipes to balance your doshas and enhance vitality",
      buttonText: "Explore Now",
      icon: faBowlFood
    }
  ];

  const styles = {
    section: {
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #f5f9e9 0%, #d8e8d2 100%)',
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      maxWidth: '1200px',
      width: '100%',
    },
    title: {
      textAlign: 'center',
      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
      fontWeight: '700',
      color: '#2E7D32',
      marginBottom: '20px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: '#388E3C',
      marginBottom: '60px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '30px',
      width: '100%',
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.4s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    },
    cardIcon: {
      marginBottom: '20px',
      textAlign: 'center',
      color: '#4CAF50',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      fontWeight: '600',
      color: '#2E7D32',
      marginBottom: '15px',
      textAlign: 'center',
    },
    cardDescription: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: '#555',
      lineHeight: '1.6',
      marginBottom: '25px',
      textAlign: 'center',
      flexGrow: 1,
    },
    cardButton: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '25px',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  // Add hover animation with JavaScript
  const handleCardHover = (e, isHover) => {
    const card = e.currentTarget;
    if (isHover) {
      card.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(50px) translateY(-10px)';
      card.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.2)';
    } else {
      card.style.transform = isVisible ? 'translateY(0)' : 'translateY(50px)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    }
  };

  // Add button hover animation
  const handleButtonHover = (e, isHover) => {
    const button = e.currentTarget;
    if (isHover) {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
    } else {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          
          @media (max-width: 768px) {
            .cards-container {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      
      <section style={styles.section} ref={sectionRef}>
        <div style={styles.container}>
          <h2 style={styles.title}>Your Wellness Destinations</h2>
          <p style={styles.subtitle}>
            Embark on a holistic journey through the four pillars of Ayurvedic wellness
          </p>
          
          <div 
            style={styles.cardsContainer}
            className="cards-container"
          >
            {cardData.map((card, index) => (
              <div 
                key={index}
                style={{
                  ...styles.card,
                  transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s, box-shadow 0.4s ease`
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div style={styles.cardIcon}>
                  <FontAwesomeIcon icon={card.icon} size="2x" />
                </div>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDescription}>{card.description}</p>
                <button 
                  style={styles.cardButton}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  {card.buttonText} <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WellnessDestinations;