import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // your axios instance

const Medicines = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ check login state from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Fetch medicines from backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await api.get('/medicines');
        setProducts(res.data || []);
      } catch (err) {
        console.error('Failed to fetch medicines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const addToCart = (productId) => {
    // ✅ If not logged in, redirect to login page
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // ✅ Otherwise add to cart
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
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Loading medicines...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        fontFamily: '"Arial", sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Back Link */}
      <Link
        to="/"
        style={{
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
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(76, 175, 80, 0.2)';
          e.target.style.transform = 'translateX(-5px)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.8)';
          e.target.style.transform = 'translateX(0)';
        }}
      >
        ← Back to Home
      </Link>

      <div
        style={{
          flex: 1,
          padding: '20px',
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          paddingTop: '80px',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            margin: '80px 0 40px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              color: '#2c5c1f',
              marginBottom: '20px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ayurvedic Medicines
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#555',
              marginBottom: '40px',
              lineHeight: 1.6,
            }}
          >
            Discover authentic herbal medicines crafted with ancient wisdom and
            modern quality standards
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            style={{
              margin: '30px auto',
              maxWidth: '500px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                borderRadius: '50px',
                padding: '5px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: '2px solid #e0e0e0',
                ...(isFocused
                  ? {
                      borderColor: '#4caf50',
                      boxShadow: '0 5px 15px rgba(76, 175, 80, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  : {}),
              }}
            >
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
                  background: 'transparent',
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
                  color: 'white',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '50px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
              No products found.
            </p>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative',
                }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="product-overlay"></div>
                <div
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    background:
                      'linear-gradient(135deg, #f9f9f9 0%, #e8f5e8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    style={{
                      width: '80%',
                      height: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{ padding: '20px', position: 'relative', zIndex: 2 }}>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2c5c1f',
                      marginBottom: '10px',
                      transition: 'all 0.3s ease',
                      transform:
                        hoveredCard === product.id ? 'translateY(-3px)' : 'none',
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      marginBottom: '15px',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      transition: 'all 0.3s ease',
                      transform:
                        hoveredCard === product.id ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    {product.description}
                  </p>
                  <h4
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: '#2c5c1f',
                      marginBottom: '10px',
                      borderBottom: '2px solid #4CAF50',
                      paddingBottom: '5px',
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      transform:
                        hoveredCard === product.id ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    Benefits
                  </h4>
                  <ul style={{ marginBottom: '20px', paddingLeft: '0' }}>
                    {(product.benefits || []).map((benefit, i) => (
                      <li
                        key={i}
                        className="benefit-item"
                        style={{
                          marginBottom: '8px',
                          color: '#555',
                          fontSize: '0.9rem',
                          listStyle: 'none',
                        }}
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '15px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: '#2c5c1f',
                        transition: 'all 0.3s ease',
                        transform:
                          hoveredCard === product.id ? 'scale(1.05)' : 'none',
                      }}
                    >
                      ${product.price?.toFixed(2)}
                    </div>
                    <button
                      id={`add-to-cart-${product.id}`}
                      className="add-to-cart-btn"
                      style={{
                        background:
                          'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        transform:
                          hoveredCard === product.id
                            ? 'translateY(-3px)'
                            : 'none',
                      }}
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicines;
