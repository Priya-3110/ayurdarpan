import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
   const navigate = useNavigate(); // ✅ initialize navigation

  // Sample cart data - in a real app, this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Brahmi Hair Oil',
      price: 16.50,
      quantity: 2,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f0f8ff"/><path d="M30,30 Q50,10 70,30 T90,50 T70,70 T50,90 T30,70 T10,50 T30,30" fill="none" stroke="%234CAF50" stroke-width="2"/><circle cx="50" cy="50" r="15" fill="%234CAF50" opacity="0.5"/></svg>'
    },
    {
      id: 3,
      name: 'Triphala Powder',
      price: 18.99,
      quantity: 1,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f5f5f5"/><circle cx="30" cy="40" r="15" fill="%238B4513" opacity="0.7"/><circle cx="50" cy="50" r="15" fill="%23A0522D" opacity="0.7"/><circle cx="70" cy="40" r="15" fill="%23CD853F" opacity="0.7"/></svg>'
    },
    {
      id: 4,
      name: 'Ashwagandha Capsules',
      price: 24.99,
      quantity: 3,
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23f8f8f8"/><ellipse cx="50" cy="50" rx="25" ry="15" fill="%232E7D32" opacity="0.7"/><ellipse cx="50" cy="50" rx="15" ry="25" fill="%234CAF50" opacity="0.5"/></svg>'
    }
  ]);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update quantity of a product
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

   const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // simple login flag
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

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
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          .cart-item {
            animation: fadeIn 0.5s ease forwards;
          }
          
          .quantity-btn {
            transition: all 0.2s ease;
          }
          
          .quantity-btn:hover {
            transform: scale(1.1);
            background: rgba(76, 175, 80, 0.2);
          }
          
          .remove-btn {
            transition: all 0.3s ease;
          }
          
          .remove-btn:hover {
            color: #f44336;
            transform: rotate(90deg);
          }
          
          .checkout-btn {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .checkout-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
          }
          
          .checkout-btn:hover::after {
            animation: ripple 1s ease-out;
          }
          
          @keyframes ripple {
            0% {
              transform: scale(0, 0);
              opacity: 1;
            }
            20% {
              transform: scale(25, 25);
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: scale(40, 40);
            }
          }
        `}
      </style>
      
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\" width=\\"100\\" height=\\"100\\" opacity=\\"0.05\\"><path d=\\"M30,30 Q50,10 70,30 T90,50 T70,70 T50,90 T30,70 T10,50 T30,30\\" fill=\\"none\\" stroke=\\"%23000\\" stroke-width=\\"2\\"/></svg>") repeat',
        animation: 'subtleMove 20s infinite linear'
      }}></div>
      
      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 10
      }}>
        <Link to="/" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
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
        
        <Link to="/medicines" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          textDecoration: 'none',
          color: '#333',
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(76, 175, 80, 0.2)';
          e.target.style.transform = 'translateX(5px)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.8)';
          e.target.style.transform = 'translateX(0)';
        }}>
          Continue Shopping →
        </Link>
      </div>
      
      {/* Main content */}
      <div style={{
        flex: 1,
        padding: '20px',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        paddingTop: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          margin: '40px 0',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '3rem',
            color: '#2c5c1f',
            marginBottom: '10px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Your Cart</h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            Review and manage your Ayurvedic wellness products
          </p>
        </div>
        
        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            margin: '20px 0'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '20px', color: '#ccc' }}>🛒</div>
            <h2 style={{ color: '#666', marginBottom: '15px' }}>Your cart is empty</h2>
            <p style={{ color: '#888', marginBottom: '30px' }}>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/medicines" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)'
            }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Cart Items */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            }}>
              {cartItems.map((item, index) => (
                <div key={item.id} className="cart-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px 0',
                  borderBottom: index < cartItems.length - 1 ? '1px solid #eee' : 'none',
                  gap: '20px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#f9f9f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#2c5c1f',
                      margin: '0 0 5px 0'
                    }}>{item.name}</h3>
                    <p style={{
                      color: '#4CAF50',
                      fontWeight: 'bold',
                      margin: 0,
                      fontSize: '1.1rem'
                    }}>${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        border: '1px solid #4CAF50',
                        background: 'transparent',
                        color: '#4CAF50',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    
                    <span style={{
                      minWidth: '30px',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>
                      {item.quantity}
                    </span>
                    
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        border: '1px solid #4CAF50',
                        background: 'transparent',
                        color: '#4CAF50',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                  
                  <div style={{
                    minWidth: '80px',
                    textAlign: 'right',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      padding: '5px',
                      marginLeft: '10px'
                    }}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#2c5c1f',
                margin: '0 0 20px 0',
                paddingBottom: '10px',
                borderBottom: '2px solid #4CAF50'
              }}>Order Summary</h2>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                margin: '20px 0',
                paddingTop: '10px',
                borderTop: '1px dashed #ddd'
              }}>
                <span>Total</span>
                <span>${(totalPrice + 5 + totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <button className="checkout-btn" style={{
                width: '100%',
                background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)'
              }}  onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
