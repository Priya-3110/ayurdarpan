import React, { useState, useEffect } from 'react';
import api from "../api"; // import axios instance

// Import all your images (you'll need to add these imports)
import honeyginger from '../assets/honeyginger.jpeg';
import Alovera from '../assets/alovera.jpeg';
import TurmericMilk from '../assets/turmeric-milk.jpg';
import OatMeal from '../assets/Oatmeal-Bath.jpg';
import PeppermintTea from '../assets/peppermint-tea.jpg';
import AppleCiderVinegar from '../assets/apple-cider-vinegar.jpg';
import SaltWaterGargle from '../assets/salt-water-gargle.jpg';
import coconut from '../assets/coco.jpg';
import CinnamonHoney from '../assets/cinnamon-honey.jpg';

const HomeRemedies = () => {
  const [remedies, setRemedies] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Map image imports to remedy IDs
  const imageMap = {
    1: honeyginger,
    2: TurmericMilk,
    3: Alovera,
    4: CinnamonHoney,
    5: AppleCiderVinegar,
    6: SaltWaterGargle,
    7: OatMeal,
    8: PeppermintTea,
    9: coconut,
    // Add more mappings as needed
  };

  // Fetch remedies from backend
  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const res = await api.get("/remedies");
        setRemedies(res.data);
      } catch (err) {
        console.error("Error fetching remedies:", err);
      }
    };
    fetchRemedies();
  }, []);


  const filteredRemedies = remedies.filter(remedy =>
    remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    remedy.for.toLowerCase().includes(searchTerm.toLowerCase()) ||
    remedy.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const openModal = (remedy) => {
    setSelectedRemedy(remedy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRemedy(null);
  };

  // Function to generate card styles with hover effects
  const getCardStyles = (id) => {
    const isHovered = hoveredCard === id;
    
    return {
      ...styles.remedyCard,
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      boxShadow: isHovered 
      ? '0 10px 25px rgba(72, 187, 120, 0.3)'  // Green shadow only
      : '0 3px 10px rgba(0,0,0,0.08)',
    };
  };

  // Function to generate button styles with hover effects
  const getButtonStyles = (id) => {
    const isHovered = hoveredCard === id;
    
    return {
      ...styles.viewMoreButton,
      backgroundColor: isHovered ?'#2f855a' : '#38a169',
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    };
  };

  // Function to generate image styles with hover effects
  const getImageStyles = (id) => {
    const isHovered = hoveredCard === id;
    
    return {
      ...styles.remedyImage,
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    };
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Home Remedies</h1>
          <p style={styles.subtitle}>Discover time-tested natural remedies using ingredients from your kitchen</p>
          
          <div style={styles.searchContainer}>
            <div style={styles.searchWrapper}>
              <svg style={styles.searchIcon} viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search for wellness..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.grid}>
          {filteredRemedies.map((remedy, index) => (
            <div 
              key={remedy._id || remedy.id || index} 
              style={getCardStyles(remedy._id || remedy.id || index)}
              onMouseEnter={() => setHoveredCard(remedy._id || remedy.id || index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div style={styles.imageContainer}>
                <img 
                  src={imageMap[remedy.id]} 
                  alt={remedy.title}
                  style={getImageStyles(remedy._id || remedy.id || index)}
                  onError={(e) => {
                    e.target.style.display = 'none'; // Hide broken images
                  }}
                />
              </div>
              
              <h3 style={styles.remedyTitle}>{remedy.title}</h3>
              <p style={styles.remedyFor}><strong>For:</strong> {remedy.for}</p>
              
              <div style={styles.ingredients}>
                <p style={styles.ingredientsTitle}><strong>Key Ingredients:</strong></p>
                <ul style={styles.ingredientList}>
                  {remedy.ingredients.slice(0, 3).map((ingredient) => (
                    <li key={ingredient || Math.random()} style={styles.ingredientItem}>- {ingredient}</li>
                  ))}
                  {remedy.ingredients.length > 3 && (
                    <li style={styles.ingredientItem}>+{remedy.ingredients.length - 3} more</li>
                  )}
                </ul>
              </div>
              
              <div style={styles.divider}></div>
              
              <p style={styles.frequency}>{remedy.frequency}</p>
              
              <button 
                style={getButtonStyles(remedy._id || remedy.id || index)}
                onClick={() => openModal(remedy)}
              >
                View More
                <svg style={{
                  ...styles.viewMoreIcon,
                  transform: hoveredCard === (remedy._id || remedy.id || index) ? 'translateX(3px)' : 'translateX(0)'
                }} viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for detailed view */}
      {isModalOpen && selectedRemedy && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <h2 style={styles.modalTitle}>{selectedRemedy.title}</h2>
            <p style={styles.modalFor}><strong>For:</strong> {selectedRemedy.for}</p>
            
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>Ingredients</h3>
              <ul style={styles.modalList}>
                {selectedRemedy.ingredients.map((ingredient, i) => (
                  <li key={ingredient || i} style={styles.modalListItem}>- {ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div style={styles.modalDivider}></div>
            
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>Benefits</h3>
              <ul style={styles.modalList}>
                {selectedRemedy.benefits.map((benefit, i) => (
                  <li key={benefit || i} style={styles.modalListItem}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={styles.modalDivider}></div>
            
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>Preparation</h3>
              <ol style={styles.modalOrderedList}>
                {selectedRemedy.preparation.map((step, i) => (
                  <li key={step || i} style={styles.modalListItem}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div style={styles.modalDivider}></div>
            
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>Usage</h3>
              <p style={styles.modalText}>{selectedRemedy.usage}</p>
              <p style={styles.modalFrequency}><strong>Frequency:</strong> {selectedRemedy.frequency}</p>
            </div>
            
            <div style={styles.modalDivider}></div>
            
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>Precautions</h3>
              <p style={styles.modalText}>{selectedRemedy.precautions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 40px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    background: 'linear-gradient(135deg, rgb(63 217 12) 0%, rgb(74, 105, 189) 100%)',
    color: 'white',
    padding: '40px 20px',
    margin: '50px -20px 30px',
    borderRadius: '0 0 12px 12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '700',
    margin: '0 0 15px 0',
    textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '0 0 30px 0',
    opacity: '0.9',
    fontWeight: '300',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#888',
  },
  searchInput: {
    width: '100%',
    padding: '15px 15px 15px 45px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '30px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.3s ease',
    ':focus': {
      outline: 'none',
      boxShadow: '0 2px 15px rgba(74, 105, 189, 0.3)',
    }
  },
  main: {
    padding: '0 10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  remedyCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
    cursor: 'pointer',
  },
  // Image container and image styles
  imageContainer: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  remedyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  remedyTitle: {
    fontSize: '1.4rem',
    color: '#2c3e50',
    margin: '0 0 10px 0',
    fontWeight: '600',
    transition: 'color 0.3s ease',
  },
  remedyFor: {
    fontSize: '1rem',
    color: '#34495e',
    margin: '0 0 15px 0',
  },
  ingredientsTitle: {
    margin: '0 0 8px 0',
    fontSize: '0.9rem',
  },
  ingredientList: {
    margin: '0',
    paddingLeft: '20px',
  },
  ingredientItem: {
    marginBottom: '5px',
    color: '#2c3e50',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ecf0f1',
    margin: '15px 0',
  },
  frequency: {
    color: '##2f855a',
    fontSize: '0.9rem',
    margin: '0 0 15px 0',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  viewMoreButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#38a169',
    padding: '10px 15px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    marginTop: 'auto',
  },
  viewMoreIcon: {
    transition: 'transform 0.3s ease',
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    backgroundColor: "#c9f0c9",
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#7f8c8d',
    padding: '5px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#f0f0f0',
    }
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  modalFor: {
    fontSize: '1.1rem',
    color: '#34495e',
    margin: '0 0 20px 0',
  },
  modalSection: {
    marginBottom: '20px',
  },
  modalSectionTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    margin: '0 0 12px 0',
  },
  modalList: {
    margin: '0',
    paddingLeft: '20px',
  },
  modalOrderedList: {
    margin: '0',
    paddingLeft: '20px',
  },
  modalListItem: {
    marginBottom: '8px',
    color: '#2c3e50',
  },
  modalDivider: {
    height: '1px',
    backgroundColor: '#ecf0f1',
    margin: '20px 0',
  },
  modalText: {
    color: '#2c3e50',
    margin: '0 0 10px 0',
    lineHeight: '1.5',
  },
  modalFrequency: {
    color: '#7f8c8d',
    fontStyle: 'italic',
    margin: '0',
  },
};

export default HomeRemedies;