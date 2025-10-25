import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // make sure this points to your axios instance or fetch wrapper

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch medicines from backend - with better error handling
  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/medicines');
      
      // Transform the data to match frontend format
      const medicinesData = res.data.map(medicine => ({
        id: medicine._id || medicine.id,
        name: medicine.name || '',
        price: medicine.price || 0,
        benefits: typeof medicine.benefits === 'string' 
          ? medicine.benefits.split(',').map(b => b.trim()).filter(b => b)
          : (medicine.benefits || []),
        description: medicine.description || 'Traditional Ayurvedic medicine',
        image: medicine.image || '/api/placeholder/300/200' // fallback image
      }));
      
      setProducts(medicinesData);
    } catch (err) {
      console.error('Failed to fetch medicines:', err);
      setError('Failed to load medicines. Please try again later.');
      // Set fallback data for demo
      setProducts([
        {
          id: 1,
          name: 'Ashwagandha',
          price: 24.99,
          benefits: ['Reduces stress', 'Improves sleep', 'Boosts immunity'],
          description: 'Traditional adaptogenic herb for stress relief',
          image: '/api/placeholder/300/200'
        },
        {
          id: 2,
          name: 'Triphala',
          price: 19.99,
          benefits: ['Digestive health', 'Detoxification', 'Antioxidant'],
          description: 'Classic Ayurvedic formula for digestive wellness',
          image: '/api/placeholder/300/200'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Auto-refresh data every 30 seconds to get new items
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMedicines();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const addToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    const button = document.getElementById(`add-to-cart-${productId}`);
    if (button) {
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
      }, 1500);
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div style={{ 
        // minHeight: '100vh', 
        // display: 'flex', 
        // alignItems: 'center', 
        // justifyContent: 'center',
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'

        minHeight: "100vh",
        background: "rgba(255, 255, 255, 0.9)",
        color: "#222",
        padding: "24px",
        
      }}>
        <div style={{ 
          textAlign: 'center',
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #4CAF50',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#2c5c1f', fontSize: '1.1rem' }}>Loading Ayurvedic Medicines...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh",
        background: "rgba(255, 255, 255, 0.9)",
        color: "#222",
        padding: "24px",
         }}>
      {/* Back Link */}
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255, 255, 255, 0.8)', border: 'none', padding: '10px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', zIndex: 10, textDecoration: 'none', color: '#333', display: 'inline-block', transition: 'all 0.3s ease' }}
        onMouseOver={(e) => { e.target.style.background = 'rgba(76, 175, 80, 0.2)'; e.target.style.transform = 'translateX(-5px)'; }}
        onMouseOut={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.8)'; e.target.style.transform = 'translateX(0)'; }}>
        ← Back to Home
      </Link>

      {/* Refresh Button */}
      <button 
        onClick={fetchMedicines}
        style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          background: 'rgba(76, 175, 80, 0.9)', 
          border: 'none', 
          padding: '10px 15px', 
          borderRadius: '20px', 
          cursor: 'pointer', 
          fontWeight: 'bold', 
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
          zIndex: 10, 
          color: 'white', 
          display: 'inline-block', 
          transition: 'all 0.3s ease',
          fontSize: '0.9rem'
        }}
        onMouseOver={(e) => { e.target.style.background = 'rgba(76, 175, 80, 1)'; e.target.style.transform = 'translateY(-2px)'; }}
        onMouseOut={(e) => { e.target.style.background = 'rgba(76, 175, 80, 0.9)'; e.target.style.transform = 'translateY(0)'; }}
      >
        🔄 Refresh
      </button>

      <div style={{ flex: 1, padding: '20px', position: 'relative', maxWidth: '1400px', margin: '0 auto', width: '100%', paddingTop: '80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', margin: '8px 0 40px', position: 'relative', zIndex: 2 }}>
          <h1 style={{  fontSize: '3rem',
        color: '#2c5c1f',
        marginBottom: '20px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign:"center"}}>Ayurvedic Medicines</h1>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px', lineHeight: 1.6 }}>"Discover authentic herbal medicines crafted with ancient wisdom and modern quality standards for natural healing."</p>

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '15px',
              borderRadius: '10px',
              margin: '20px auto',
              maxWidth: '500px',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          {/* Search */}
          <form onSubmit={handleSearch} style={{ margin: '30px auto', maxWidth: '500px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '50px', padding: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', border: '2px solid #e0e0e0', ...(isFocused ? { borderColor: '#4caf50', boxShadow: '0 5px 15px rgba(76, 175, 80, 0.2)', transform: 'translateY(-2px)' } : {}) }}>
              <input 
                type="text" 
                placeholder="Search for wellness..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
                style={{ flex: 1, border: 'none', padding: '15px 20px', fontSize: '1rem', borderRadius: '50px', outline: 'none', background: 'transparent' }} 
              />
              <button type="submit" style={{ background: '#4caf50', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: 'white' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>
              </button>
            </div>
          </form>
        </div>

        {/* Products Count */}
        <div style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Showing {filteredProducts.length} of {products.length} medicines
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginTop: '20px', position: 'relative', zIndex: 2 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
              <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>No medicines found matching "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Show All Medicines
              </button>
            </div>
          ) : filteredProducts.map((product, index) => (
            <div key={product.id} className="product-card" style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', animationDelay: `${index * 0.1}s`, position: 'relative', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredCard(product.id)} onMouseLeave={() => setHoveredCard(null)}>
              <div className="product-overlay"></div>
              <div style={{ width: '100%', height: '200px', objectFit: 'cover', background: 'linear-gradient(135deg, #f9f9f9 0%, #e8f5e8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {product.image && product.image !== '/api/placeholder/300/200' ? (
                  <img src={product.image} alt={product.name} className="product-image" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: '#4CAF50' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌿</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Ayurvedic Medicine</div>
                  </div>
                )}
              </div>
              <div style={{ padding: '20px', position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c5c1f', marginBottom: '10px', transition: 'all 0.3s ease', transform: hoveredCard === product.id ? 'translateY(-3px)' : 'none' }}>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '15px', fontSize: '0.9rem', lineHeight: 1.5, transition: 'all 0.3s ease', transform: hoveredCard === product.id ? 'translateY(-2px)' : 'none' }}>{product.description}</p>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2c5c1f', marginBottom: '10px', borderBottom: '2px solid #4CAF50', paddingBottom: '5px', display: 'inline-block', transition: 'all 0.3s ease', transform: hoveredCard === product.id ? 'translateY(-2px)' : 'none' }}>Benefits</h4>
                <ul style={{ marginBottom: '20px', paddingLeft: '0' }}>
                  {(product.benefits || []).slice(0, 3).map((benefit, i) => (
                    <li key={i} className="benefit-item" style={{ marginBottom: '8px', color: '#555', fontSize: '0.9rem', listStyle: 'none', paddingLeft: '15px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '0', color: '#4CAF50' }}>•</span>
                      {benefit}
                    </li>
                  ))}
                  {product.benefits.length > 3 && (
                    <li style={{ color: '#888', fontSize: '0.8rem', fontStyle: 'italic', listStyle: 'none' }}>
                      +{product.benefits.length - 3} more benefits
                    </li>
                  )}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2c5c1f', transition: 'all 0.3s ease', transform: hoveredCard === product.id ? 'scale(1.05)' : 'none' }}>${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</div>
                  <button id={`add-to-cart-${product.id}`} className="add-to-cart-btn" style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease', transform: hoveredCard === product.id ? 'translateY(-3px) scale(1.05)' : 'none', boxShadow: hoveredCard === product.id ? '0 5px 15px rgba(76, 175, 80, 0.3)' : 'none' }} onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .product-card {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Medicines;