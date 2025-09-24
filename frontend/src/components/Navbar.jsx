import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TransparentGreenNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate hook

   useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const user = localStorage.getItem("currentUser");
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Update active item based on current route
    if (location.pathname === '/') {
      setActiveItem('Home');
    } else if (location.pathname === '/medicines') {
      setActiveItem('Medicines');
    } else if (location.pathname === '/cart') {
      setActiveItem('Cart');
    }
    else if (location.pathname === '/remedies') {
      setActiveItem('HomeRemedies');
    }
    else if (location.pathname === '/recipes') {
      setActiveItem('Recipe');
    }
    else if (location.pathname === '/yoga') {
      setActiveItem('YogaPoses');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // const handleLogin = () => {
  //   setIsLoggedIn(!isLoggedIn);
  // };
const handleLogin = () => {
    if (isLoggedIn) {
      // logout
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate("/"); 
    } else {
      navigate("/login"); // go to login page
    }
  };

  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  // Function to handle cart icon click
  const handleCartClick = () => {
    navigate('/cart'); // Navigate to cart page
    setActiveItem('Cart');
  };

  // Inline styles (your existing styles remain the same)
  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1rem 2rem',
      background: isScrolled ? '#E1F8DC' : 'rgba(225, 248, 220, 0.9)',
      backdropFilter: isScrolled ? 'none' : 'blur(10px)',
      WebkitBackdropFilter: isScrolled ? 'none' : 'blur(10px)',
      borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: isScrolled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.3s ease',
    },
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      justifyContent: 'space-between',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto',
    },
    logoIcon: {
      width: '45px',
      height: '45px',
      cursor: 'pointer',
      transition: 'transform 0.5s ease',
      marginRight: '15px',
    },
    logoSvg: {
      width: '100%',
      height: '100%',
      filter: 'drop-shadow(0 0 5px rgba(76, 175, 80, 0.5))',
    },
    logoCircle: {
      fill: 'none',
      stroke: '#4CAF50',
      strokeWidth: '3',
      strokeDasharray: '283',
      strokeDashoffset: '283',
      animation: 'drawCircle 1.5s ease-in-out forwards',
    },
    logoCross: {
      fill: 'none',
      stroke: '#2E7D32',
      strokeWidth: '3',
      strokeDasharray: '113',
      strokeDashoffset: '113',
      animation: 'drawCross 1s ease-in-out forwards',
      animationDelay: '0.8s',
    },
    brandText: {
      fontSize: '1.8rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '1px',
      position: 'relative',
      textShadow: '0 2px 10px rgba(76, 175, 80, 0.3)',
      transition: 'all 0.3s ease',
    },
    brandUnderline: {
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      width: '0',
      height: '2px',
      background: 'linear-gradient(90deg, #4CAF50, transparent)',
      transition: 'width 0.5s ease',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      margin: '0',
      padding: '0',
      gap: '1.5rem',
      flex: '1',
      justifyContent: 'center',
      '@media (max-width: 968px)': {
        gap: '1rem',
      },
    },
    navItem: {
      position: 'relative',
    },
    navLink: {
      color: isScrolled ? '#2E7D32' : 'rgba(46, 125, 50, 0.9)',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '1rem',
      padding: '0.5rem 0',
      position: 'relative',
      transition: 'color 0.3s ease',
    },
    navLinkUnderline: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '0',
      height: '2px',
      background: 'linear-gradient(90deg, #4CAF50, #2E7D32)',
      transition: 'width 0.3s ease',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto',
      gap: '1rem',
    },
    cartIcon: {
      position: 'relative',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
    },
    cartCount: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      background: '#ff4757',
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '0.7rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    loginBtn: {
      background: isScrolled ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.15)',
      border: isScrolled ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(76, 175, 80, 0.2)',
      color: isScrolled ? '#2E7D32' : 'rgba(46, 125, 50, 0.9)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '0.9rem',
    },
    loginIcon: {
      width: '20px',
      height: '20px',
      fill: isScrolled ? '#2E7D32' : 'rgba(46, 125, 50, 0.9)',
    },
    userContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
    },
    userName: {
      color: isScrolled ? '#2E7D32' : 'rgba(46, 125, 50, 0.9)',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.3)',
      cursor: 'pointer',
      position: 'relative',
    },
    avatarTooltip: {
      position: 'absolute',
      top: '100%',
      right: '0',
      marginTop: '8px',
      padding: '5px 10px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      fontSize: '0.7rem',
      borderRadius: '4px',
      opacity: '0',
      visibility: 'hidden',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
    },
  };

  // Function to handle hover effects
  const handleHover = (e, isHover) => {
    if (isHover) {
      e.target.style.color = '#4CAF50';
      if (e.target.querySelector('span')) {
        e.target.querySelector('span').style.width = '100%';
      }
    } else {
      if (activeItem !== e.target.textContent) {
        e.target.style.color = isScrolled ? '#2E7D32' : 'rgba(46, 125, 50, 0.9)';
      }
      if (activeItem !== e.target.textContent && e.target.querySelector('span')) {
        e.target.querySelector('span').style.width = '0';
      }
    }
  };

  // Function to handle logo hover
  const handleLogoHover = (isHover) => {
    const logo = document.querySelector('.logo-icon');
    if (logo) {
      logo.style.transform = isHover ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  };

  // Function to handle avatar hover
  const handleAvatarHover = (isHover) => {
    const avatar = document.querySelector('.avatar');
    const tooltip = document.querySelector('.avatar-tooltip');
    if (avatar && tooltip) {
      if (isHover) {
        avatar.style.transform = 'scale(1.1)';
        avatar.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.5), 0 5px 15px rgba(76, 175, 80, 0.3)';
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      } else {
        avatar.style.transform = 'scale(1)';
        avatar.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.3)';
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      }
    }
  };

  // Function to handle brand name hover
  const handleBrandHover = (isHover) => {
    const underline = document.querySelector('.brand-underline');
    if (underline) {
      underline.style.width = isHover ? '100%' : '0';
    }
  };

  // Function to handle cart hover
  const handleCartHover = (isHover) => {
    const cart = document.querySelector('.cart-icon');
    if (cart) {
      if (isHover) {
        cart.style.background = 'rgba(76, 175, 80, 0.1)';
      } else {
        cart.style.background = 'transparent';
      }
    }
  };

  return (
    <>
      {/* Inline styles for the component */}
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
          }
          
          @keyframes drawCircle {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawCross {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          .nav-link.active {
            color: #4CAF50 !important;
          }
          
          .nav-link.active span {
            width: 100% !important;
          }
          
          .login-btn:hover {
            background: rgba(76, 175, 80, 0.3) !important;
            box-shadow: 0 0 15px rgba(76, 175, 80, 0.3) !important;
          }
          
          .cart-icon:hover {
            background: rgba(76, 175, 80, 0.1) !important;
          }
        `}
      </style>

      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          {/* Logo with animation - Link to home */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <div style={styles.logoContainer}>
              <div 
                style={styles.logoIcon}
                className="logo-icon"
                onMouseEnter={() => handleLogoHover(true)}
                onMouseLeave={() => handleLogoHover(false)}
              >
                <svg viewBox="0 0 100 100" style={styles.logoSvg}>
                  <circle cx="50" cy="50" r="45" style={styles.logoCircle} />
                  <path d="M30,30 L70,70 M70,30 L30,70" style={styles.logoCross} />
                </svg>
              </div>
            </div>

            {/* Brand Name */}
            <div 
              style={{position: 'relative', display: 'inline-block'}}
              onMouseEnter={() => handleBrandHover(true)}
              onMouseLeave={() => handleBrandHover(false)}
            >
              <span style={styles.brandText}>AyurDarpan</span>
              <span style={styles.brandUnderline} className="brand-underline"></span>
            </div>
          </Link>

          {/* Navigation Items */}
          <ul style={styles.navMenu}>
            {['Home', 'YogaPoses', 'Medicines', 'Recipe', 'HomeRemedies'].map((item) => (
              <li key={item} style={styles.navItem}>
                {item === 'Home' ? (
                  <Link
                    to="/"
                    style={styles.navLink}
                    className={activeItem === item ? 'nav-link active' : 'nav-link'}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                    <span style={styles.navLinkUnderline}></span>
                  </Link>
                ) : item === 'Medicines' ? (
                  <Link
                    to="/medicines"
                    style={styles.navLink}
                    className={activeItem === item ? 'nav-link active' : 'nav-link'}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                    <span style={styles.navLinkUnderline}></span>
                  </Link>
                ) : item === 'HomeRemedies' ? (
                  <Link
                    to="/remedies"
                    style={styles.navLink}
                    className={activeItem === item ? 'nav-link active' : 'nav-link'}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                    <span style={styles.navLinkUnderline}></span>
                  </Link>
                ) : item === 'Recipe' ? (
                  <Link
                    to="/recipes"
                    style={styles.navLink}
                    className={activeItem === item ? 'nav-link active' : 'nav-link'}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                    <span style={styles.navLinkUnderline}></span>
                  </Link>
                ) : item === 'YogaPoses' ? (
                  <Link
                    to="/yoga"
                    style={styles.navLink}
                    className={activeItem === item ? 'nav-link active' : 'nav-link'}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                    <span style={styles.navLinkUnderline}></span>
                  </Link>
                )  : (
                  <a
                    href="#"
                    style={styles.navLink}
                    className={activeItem === item ? 'nav-link active' : 'nav-link'}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                  >
                    {item}
                    <span style={styles.navLinkUnderline}></span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* User Section with Cart Icon */}
          <div style={styles.userSection}>
            {/* Cart Icon - Now clickable and navigates to cart page */}
            <div 
              style={styles.cartIcon}
              className="cart-icon"
              onMouseEnter={() => handleCartHover(true)}
              onMouseLeave={() => handleCartHover(false)}
              onClick={handleCartClick} // Add click handler
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isScrolled ? '#2E7D32' : 'rgba(46, 125, 50, 0.9)'}>
                <path d="M7 22C5.9 22 5 21.1 5 20S5.9 18 7 18 9 18.9 9 20 8.1 22 7 22M17 22C15.9 22 15 21.1 15 20S15.9 18 17 18 19 18.9 19 20 18.1 22 17 22M21.5 18H7.5C6.8 18 6.2 17.6 6 17L1 2H0V0H3C3.6 0 4 0.4 4.2 0.9L5.2 3H22C22.4 3 22.7 3.2 22.9 3.6C23.1 4 23 4.4 22.8 4.8L19.3 11C19 11.6 18.4 12 17.7 12H8.5L7.8 14H19C19.6 14 20 14.4 20 15S19.6 16 19 16H7C6.4 16 6 15.6 6 15C6 14.8 6 14.7 6.1 14.5L7.5 11.6L3 4H1V2H4.3L5.1 4L6.9 7.6L5.4 10.4C5.1 10.8 5 11.3 5.2 11.8C5.4 12.3 5.9 12.6 6.4 12.6H18C18.2 12.6 18.4 12.6 18.5 12.5C18.6 12.4 18.7 12.4 18.8 12.3L21.6 7.5C21.9 7 22 6.5 21.9 6C21.8 5.5 21.5 5 21 4.6C20.6 4.2 20 4 19.5 4H6.5L5.8 2.4C5.7 2.1 5.5 2 5.2 2H2V4L6 15H17C17.6 15 18 15.4 18 16S17.6 17 17 17H7.5C7.2 17 7 16.8 6.9 16.6L6.6 16H20.5C21.1 16 21.5 16.4 21.5 17S21.1 18 20.5 18H21.5Z" />
              </svg>
              <div style={styles.cartCount}>3</div>
            </div>

            {isLoggedIn ? (
          <div style={styles.userContainer}>
            <span style={styles.userName}>{currentUser}</span>
            <div 
              style={styles.avatar}
              className="avatar"
              onClick={handleLogin}
            >
              {currentUser?.slice(0,2).toUpperCase() || "U"}
              <div style={styles.avatarTooltip} className="avatar-tooltip">Click to logout</div>
            </div>
          </div>
            ) : (
              <button 
                style={styles.loginBtn}
                className="login-btn"
                onClick={handleLogin}
              >
                <span>Login</span>
                <svg style={styles.loginIcon} viewBox="0 0 24 24">
                  <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TransparentGreenNavbar;