import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const addToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    
    // Show temporary feedback
    const button = document.getElementById(`add-to-cart-${productId}`);
    if (button) {
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
      }, 1500);
    }
  };

  // Product data
  const products = [
    {
      id: 1,
      name: 'Brahmi Hair Oil',
      description: 'Nourishing hair oil infused with Brahmi and coconut oil for healthier hair and scalp',
      benefits: ['Promotes hair growth', 'Reduces hair fall', 'Nourishes scalp'],
      price: 16.50,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f0f8ff"/><path d="M30,30 Q50,10 70,30 T90,50 T70,70 T50,90 T30,70 T10,50 T30,30" fill="none" stroke="%234CAF50" stroke-width="2"/><circle cx="50" cy="50" r="15" fill="%234CAF50" opacity="0.5"/></svg>'
    },
    {
      id: 2,
      name: 'Turmeric Golden Milk Mix',
      description: 'Warming golden milk blend with turmeric, ginger, and other beneficial spices',
      benefits: ['Anti-inflammatory properties', 'Boosts immunity', 'Aids digestion'],
      price: 12.99,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23fffaf0"/><circle cx="50" cy="50" r="30" fill="%23FFD700" opacity="0.7"/><rect x="35" y="30" width="30" height="40" fill="%23FFA500" opacity="0.6"/></svg>'
    },
    {
      id: 3,
      name: 'Triphala Powder',
      description: 'Traditional three-fruit blend for digestive health and overall wellness',
      benefits: ['Improves digestion', 'Natural detoxification', 'Supports weight management', 'Rich in antioxidants'],
      price: 18.99,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f5f5f5"/><circle cx="30" cy="40" r="15" fill="%238B4513" opacity="0.7"/><circle cx="50" cy="50" r="15" fill="%23A0522D" opacity="0.7"/><circle cx="70" cy="40" r="15" fill="%23CD853F" opacity="0.7"/></svg>'
    },
    {
      id: 4,
      name: 'Ashwagandha Capsules',
      description: 'Premium Ashwagandha root extract capsules for stress relief and vitality',
      benefits: ['Reduces stress and anxiety', 'Boosts energy levels', 'Improves sleep quality', 'Enhances cognitive function'],
      price: 24.99,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f8f8f8"/><ellipse cx="50" cy="50" rx="25" ry="15" fill="%232E7D32" opacity="0.7"/><ellipse cx="50" cy="50" rx="15" ry="25" fill="%234CAF50" opacity="0.5"/></svg>'
    },
    {
      id: 5,
      name: 'Neem Face Wash',
      description: 'Natural neem-based face wash for clear and healthy skin',
      benefits: ['Fights acne', 'Reduces inflammation', 'Controls oil production'],
      price: 14.99,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f0fff0"/><circle cx="50" cy="50" r="30" fill="%23228B22" opacity="0.5"/><path d="M30,30 L70,70 M70,30 L30,70" stroke="%23008000" stroke-width="5"/></svg>'
    },
    {
      id: 6,
      name: 'Sandalwood Soap',
      description: 'Luxurious sandalwood soap for nourished and fragrant skin',
      benefits: ['Moisturizes skin', 'Natural fragrance', 'Antibacterial properties'],
      price: 9.99,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23FFF8DC"/><rect x="25" y="25" width="50" height="50" rx="5" fill="%23DEB887" opacity="0.7"/><circle cx="50" cy="50" r="15" fill="%23A0522D" opacity="0.5"/></svg>'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '"Arial", sans-serif',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes subtleMove {
            0% { background-position: 0 0; }
            100% { background-position: 100px 100px; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .product-card {
            animation: fadeIn 0.6s ease forwards;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-origin: center;
            cursor: pointer;
          }
          
          .product-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            z-index: 2;
          }
          
          .product-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #4CAF50, #2E7D32);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
            z-index: 3;
          }
          
          .product-card:hover::before {
            transform: scaleX(1);
          }
          
          .product-image {
            transition: all 0.5s ease;
          }
          
          .product-card:hover .product-image {
            transform: scale(1.1);
          }
          
          .add-to-cart-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          
          .add-to-cart-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
          }
          
          .benefit-item {
            position: relative;
            padding-left: 15px;
            transition: all 0.3s ease;
          }
          
          .product-card:hover .benefit-item {
            transform: translateX(5px);
            color: #2E7D32;
          }
          
          .benefit-item::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #4CAF50;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          
          .product-card:hover .benefit-item::before {
            color: #2E7D32;
            transform: scale(1.2);
          }
          
          .product-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(76, 175, 80, 0.1), rgba(46, 125, 50, 0.2));
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
          }
          
          .product-card:hover .product-overlay {
            opacity: 1;
          }
          
          ${products.map((_, index) => `
            .product-card:nth-child(${index + 1}) {
              animation-delay: ${index * 0.1}s;
            }
          `).join('')}
        `}
      </style>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\" opacity=\"0.05\"><path d=\"M30,30 Q50,10 70,30 T90,50 T70,70 T50,90 T30,70 T10,50 T30,30\" fill=\"none\" stroke=\"%23000\" stroke-width=\"2\"/></svg>") repeat',
        animation: 'subtleMove 20s infinite linear'
      }}></div>
      
      <Link to="/" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        textDecoration: 'none',
        color: '#333',
        display: 'inline-block',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.background = 'rgba(76, 175, 80, 0.2)';
        e.target.style.transform = 'translateX(-5px)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.8)';
        e.target.style.transform = 'translateX(0)';
      }}>
        ← Back to Home
      </Link>
      
      <div style={{
        flex: 1,
        padding: '20px',
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        paddingTop: '80px'
      }}>
        <div style={{
          textAlign: 'center',
          margin: '80px 0 40px',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '3rem',
            color: '#2c5c1f',
            marginBottom: '20px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Ayurvedic Medicines</h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            Discover authentic herbal medicines crafted with ancient wisdom and modern quality standards
          </p>
          
          <form onSubmit={handleSearch} style={{
            margin: '30px auto',
            maxWidth: '500px',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '50px',
              padding: '5px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: '2px solid #e0e0e0',
              ...(isFocused ? {
                borderColor: '#4caf50',
                boxShadow: '0 5px 15px rgba(76, 175, 80, 0.2)',
                transform: 'translateY(-2px)'
              } : {})
            }}>
              <input
                type="text"
                placeholder="Search for wellness..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '15px 20px',
                  fontSize: '1rem',
                  borderRadius: '50px',
                  outline: 'none',
                  background: 'transparent'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: '#4caf50',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#388e3c';
                  e.target.style.transform = 'rotate(15deg) scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#4caf50';
                  e.target.style.transform = 'none';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '50px',
          position: 'relative',
          zIndex: 2
        }}>
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                animationDelay: `${index * 0.1}s`,
                position: 'relative'
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="product-overlay"></div>
              
              <div style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                background: 'linear-gradient(135deg, #f9f9f9 0%, #e8f5e8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '20px', position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#2c5c1f',
                  marginBottom: '10px',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === product.id ? 'translateY(-3px)' : 'none'
                }}>{product.name}</h3>
                <p style={{
                  color: '#666',
                  marginBottom: '15px',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === product.id ? 'translateY(-2px)' : 'none'
                }}>{product.description}</p>
                
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#2c5c1f',
                  marginBottom: '10px',
                  borderBottom: '2px solid #4CAF50',
                  paddingBottom: '5px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === product.id ? 'translateY(-2px)' : 'none'
                }}>Benefits</h4>
                <ul style={{
                  marginBottom: '20px',
                  paddingLeft: '0'
                }}>
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="benefit-item" style={{
                      marginBottom: '8px',
                      color: '#555',
                      fontSize: '0.9rem',
                      listStyle: 'none'
                    }}>{benefit}</li>
                  ))}
                </ul>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px'
                }}>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: '#2c5c1f',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === product.id ? 'scale(1.05)' : 'none'
                  }}>${product.price.toFixed(2)}</div>
                  <button 
                    id={`add-to-cart-${product.id}`}
                    className="add-to-cart-btn"
                    style={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      transform: hoveredCard === product.id ? 'translateY(-3px)' : 'none'
                    }}
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 1}}>
          <div style={{
            position: 'absolute',
            backgroundColor: '#4caf50',
            opacity: 0.2,
            borderRadius: '50% 0 50% 0',
            width: '100px',
            height: '60px',
            top: '10%',
            left: '10%',
            transform: 'rotate(45deg)',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            backgroundColor: '#4caf50',
            opacity: 0.2,
            borderRadius: '50% 0 50% 0',
            width: '80px',
            height: '50px',
            bottom: '20%',
            right: '15%',
            transform: 'rotate(-20deg)',
            animation: 'float 8s ease-in-out infinite 1s'
          }}></div>
          <div style={{
            position: 'absolute',
            backgroundColor: '#4caf50',
            opacity: 0.2,
            borderRadius: '50% 0 50% 0',
            width: '120px',
            height: '70px',
            top: '40%',
            right: '20%',
            transform: 'rotate(10deg)',
            animation: 'float 10s ease-in-out infinite 2s'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default Medicines;