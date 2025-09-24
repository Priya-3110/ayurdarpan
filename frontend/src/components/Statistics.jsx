import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faSeedling,
  faCalendarAlt,
  faCheckCircle,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const WellnessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const sectionRef = useRef(null);
  const animationRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Reset animation when section leaves viewport
        if (!entry.isIntersecting) {
          setCountersAnimated(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      // Clean up any animation frames
      animationRefs.current.forEach(ref => cancelAnimationFrame(ref));
    };
  }, []);

  useEffect(() => {
    if (isVisible && !countersAnimated) {
      const counters = document.querySelectorAll('.counter');
      let animationsCompleted = 0;
      
      counters.forEach((counter, index) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix');
        const duration = 2000; // Animation duration in ms
        const startTime = Date.now();
        const startValue = 0;
        
        const updateCounter = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          
          if (elapsed < duration) {
            const progress = elapsed / duration;
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            counter.textContent = current.toLocaleString() + suffix;
            animationRefs.current[index] = requestAnimationFrame(updateCounter);
          } else {
            // Ensure final value is exact
            counter.textContent = target.toLocaleString() + suffix;
            animationsCompleted++;
            
            // Check if all animations are done
            if (animationsCompleted === counters.length) {
              setCountersAnimated(true);
            }
          }
        };
        
        // Start the animation
        animationRefs.current[index] = requestAnimationFrame(updateCounter);
      });
    }
  }, [isVisible, countersAnimated]);

  const statsData = [
    { value: 10000, label: "Happy Customers", suffix: "+", icon: faUsers },
    { value: 500, label: "Authentic Products", suffix: "+", icon: faSeedling },
    { value: 25, label: "Years of Trust", suffix: "+", icon: faCalendarAlt },
    { value: 100, label: "Natural & Pure", suffix: "%", icon: faCheckCircle }
  ];

  const styles = {
    section: {
      padding: '80px 20px',
      background: 'linear-gradient(to bottom, #e1f8dc 0%, #f8fff8 100%)',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      maxWidth: '1200px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    unifiedContainer: {
      background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
      borderRadius: '20px',
      padding: '50px 40px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
      width: '100%',
      marginBottom: '60px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    },
    title: {
      textAlign: 'center',
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: 'white',
      marginBottom: '20px',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '50px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '30px',
      width: '100%',
    },
    statItem: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      padding: '30px 20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      transition: 'all 0.4s ease',
    },
    statIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      color: 'white',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statValue: {
      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
      fontWeight: '700',
      color: 'white',
      marginBottom: '10px',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statLabel: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: 'rgba(255, 255, 255, 0.9)',
    },
    ctaSection: {
      textAlign: 'center',
      background: 'white',
      borderRadius: '20px',
      padding: '50px 40px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      maxWidth: '800px',
      width: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
    },
    ctaTitle: {
      fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
      fontWeight: '700',
      color: '#2E7D32',
      marginBottom: '15px',
      lineHeight: '1.3',
    },
    ctaDescription: {
      fontSize: 'clamp(1rem, 2vw, 1.1rem)',
      color: '#555',
      lineHeight: '1.6',
      marginBottom: '30px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      color: 'white',
      border: 'none',
      padding: '16px 40px',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
    },
  };

  // Add hover animations
  const handleStatHover = (e, isHover) => {
    const stat = e.currentTarget;
    if (isHover) {
      stat.style.transform = 'translateY(-8px)';
      stat.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
      stat.style.transform = 'translateY(0)';
      stat.style.background = 'rgba(255, 255, 255, 0.1)';
    }
  };

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
          
          @media (max-width: 968px) {
            .stats-container {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          
          @media (max-width: 568px) {
            .stats-container {
              grid-template-columns: 1fr !important;
            }
            
            .unified-container {
              padding: 30px 20px !important;
            }
          }
        `}
      </style>
      
      <section style={styles.section} ref={sectionRef}>
        <div style={styles.container}>
          <div 
            style={styles.unifiedContainer}
            className="unified-container"
          >
            <h2 style={styles.title}>Trusted by Thousands</h2>
            <p style={styles.subtitle}>
              Join our community of wellness enthusiasts
            </p>
            
            <div 
              style={styles.statsContainer}
              className="stats-container"
            >
              {statsData.map((stat, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.statItem,
                    transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                  }}
                  onMouseEnter={(e) => handleStatHover(e, true)}
                  onMouseLeave={(e) => handleStatHover(e, false)}
                >
                  <div style={styles.statIcon}>
                    <FontAwesomeIcon icon={stat.icon} size="2x" />
                  </div>
                  <div 
                    style={styles.statValue}
                    className="counter"
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </div>
                  <div style={styles.statLabel}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>Begin Your Wellness Journey Today</h3>
            <p style={styles.ctaDescription}>
              Take the first step towards holistic wellness with our comprehensive Ayurvedic solutions tailored for modern living.
            </p>
            <button 
              style={styles.ctaButton}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Shop Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WellnessSection;