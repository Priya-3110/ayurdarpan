import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Data states
  const [medicines, setMedicines] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [yogaPoses, setYogaPoses] = useState([]);
  const [remedies, setRemedies] = useState([]);

  // Form states
  const [activeTab, setActiveTab] = useState('medicines');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: [],
    price: '',
    image: '',
    dosha: '',
    time: '',
    difficulty: '',
    category: '',
    purpose: '',
    ingredients: []
  });

  // Sample initial data
  useEffect(() => {
    if (isLoggedIn) {
      setMedicines([
        {
          id: 1,
          name: 'Brahmi Hair Oil',
          description: 'Nourishing hair oil infused with Brahmi and coconut oil for healthier hair and scalp',
          benefits: ['Promotes hair growth', 'Reduces hair fall', 'Nourishes scalp'],
          price: 16.50,
          image: 'brahmi-oil.jpg'
        }
      ]);

      setRecipes([
        {
          id: 1,
          name: 'Golden Turmeric Milk',
          dosha: 'Vata',
          description: 'A warming Ayurvedic drink balancing Vata & Kapha',
          time: 'Evening',
          image: 'turmeric-milk.jpg'
        }
      ]);

      setYogaPoses([
        {
          id: 1,
          name: 'Mountain Pose',
          difficulty: 'Beginner',
          description: 'A foundational standing pose that improves posture and balance',
          category: 'Standing',
          image: 'mountain-pose.jpg'
        }
      ]);

      setRemedies([
        {
          id: 1,
          name: 'Apple Cider Vinegar',
          purpose: 'Digestive Issues',
          ingredients: ['Apple Cider Vinegar', 'Water', 'Honey'],
          description: 'Helps with digestion and gut health',
          image: 'acv-remedy.jpg'
        }
      ]);
    }
  }, [isLoggedIn]);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === '12345') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin/12345');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      benefits: [],
      price: '',
      image: '',
      dosha: '',
      time: '',
      difficulty: '',
      category: '',
      purpose: '',
      ingredients: []
    });
    setEditingItem(null);
  };

  // CRUD Operations
  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...formData
    };

    switch (activeTab) {
      case 'medicines':
        setMedicines(prev => [...prev, newItem]);
        break;
      case 'recipes':
        setRecipes(prev => [...prev, newItem]);
        break;
      case 'yoga':
        setYogaPoses(prev => [...prev, newItem]);
        break;
      case 'remedies':
        setRemedies(prev => [...prev, newItem]);
        break;
      default:
        break;
    }

    resetForm();
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      description: item.description || '',
      benefits: item.benefits || [],
      price: item.price || '',
      image: item.image || '',
      dosha: item.dosha || '',
      time: item.time || '',
      difficulty: item.difficulty || '',
      category: item.category || '',
      purpose: item.purpose || '',
      ingredients: item.ingredients || []
    });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    
    const updateData = (setter) => {
      setter(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, ...formData } : item
      ));
    };

    switch (activeTab) {
      case 'medicines':
        updateData(setMedicines);
        break;
      case 'recipes':
        updateData(setRecipes);
        break;
      case 'yoga':
        updateData(setYogaPoses);
        break;
      case 'remedies':
        updateData(setRemedies);
        break;
      default:
        break;
    }

    resetForm();
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const deleteData = (setter) => {
        setter(prev => prev.filter(item => item.id !== id));
      };

      switch (activeTab) {
        case 'medicines':
          deleteData(setMedicines);
          break;
        case 'recipes':
          deleteData(setRecipes);
          break;
        case 'yoga':
          deleteData(setYogaPoses);
          break;
        case 'remedies':
          deleteData(setRemedies);
          break;
        default:
          break;
      }
    }
  };

  // Modern, simple styles
  const styles = {
    // Login Styles
    loginContainer: {
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    loginCard: {
      background: 'white',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      width: '100%',
      maxWidth: '400px'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151'
    },
    input: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: '#f9fafb'
    },
    loginBtn: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px'
    },
    errorMessage: {
      background: '#fef2f2',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '0.9rem',
      border: '1px solid #fecaca'
    },
    demoCredentials: {
      marginTop: '20px',
      padding: '16px',
      background: '#f0fdf4',
      borderRadius: '6px',
      fontSize: '0.9rem',
      border: '1px solid #bbf7d0'
    },

    // Dashboard Styles
    adminDashboard: {
      minHeight: '100vh',
      background: '#f8fafc'
    },
    adminHeader: {
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logoutBtn: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    adminNav: {
      background: 'white',
      padding: '0 40px',
      display: 'flex',
      gap: '0',
      borderBottom: '1px solid #e5e7eb'
    },
    navTab: {
      padding: '16px 24px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.95rem',
      color: '#6b7280',
      borderBottom: '2px solid transparent',
      fontWeight: '500'
    },
    navTabActive: {
      color: '#10b981',
      borderBottomColor: '#10b981',
      background: '#f0fdf4'
    },
    dashboardContent: {
      display: 'grid',
      gridTemplateColumns: '400px 1fr',
      gap: '32px',
      padding: '32px',
      maxWidth: '1400px',
      margin: '0 auto'
    },

    // Form Styles
    formSection: {
      background: 'white',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      height: 'fit-content',
      position: 'sticky',
      top: '20px'
    },
    itemForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    textarea: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '80px',
      backgroundColor: '#f9fafb'
    },
    select: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: '#f9fafb'
    },
    formActions: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px'
    },
    submitBtn: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      flex: '1'
    },
    cancelBtn: {
      background: '#6b7280',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600'
    },

    // List Styles
    listSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    itemsGrid: {
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
    },
    itemCard: {
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    },
    itemImage: {
      width: '100%',
      height: '120px',
      background: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imagePlaceholder: {
      color: '#9ca3af',
      fontSize: '0.8rem'
    },
    itemContent: {
      padding: '20px'
    },
    itemActions: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px'
    },
    editBtn: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    deleteBtn: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '500'
    },

    // Text Styles
    h1: {
      margin: '0',
      fontWeight: '700',
      fontSize: '1.5rem',
      color: '#111827'
    },
    h2: {
      color: '#111827',
      margin: '0 0 20px 0',
      fontWeight: '600',
      fontSize: '1.25rem'
    },
    h3: {
      margin: '0 0 8px 0',
      color: '#111827',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    p: {
      color: '#6b7280',
      margin: '0 0 12px 0',
      lineHeight: '1.5',
      fontSize: '0.95rem'
    },
    itemDetails: {
      fontSize: '0.9rem',
      color: '#4b5563',
      marginBottom: '12px'
    },
    benefitsList: {
      margin: '4px 0',
      paddingLeft: '16px',
      fontSize: '0.9rem'
    }
  };

  // Render login form if not authenticated
  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <h2 style={{ color: '#10b981', margin: '0 0 24px 0', fontWeight: '700', fontSize: '1.5rem', textAlign: 'center' }}>
            Ayurvedic Admin
          </h2>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({...prev, username: e.target.value}))}
                placeholder="Enter username"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                placeholder="Enter password"
                required
                style={styles.input}
              />
            </div>
            {loginError && <div style={styles.errorMessage}>{loginError}</div>}
            <button type="submit" style={styles.loginBtn}>
              Sign In
            </button>
          </form>
          <div style={styles.demoCredentials}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#065f46' }}>Demo Credentials:</p>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>Username: <strong>admin</strong></p>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>Password: <strong>12345</strong></p>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div style={styles.adminDashboard}>
      {/* Header */}
      <header style={styles.adminHeader}>
        <h1 style={styles.h1}>Content Manager</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Sign Out
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav style={styles.adminNav}>
        {['medicines', 'recipes', 'yoga', 'remedies'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.navTab,
              ...(activeTab === tab ? styles.navTabActive : {})
            }}
            onClick={() => {
              setActiveTab(tab);
              resetForm();
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <div style={styles.dashboardContent}>
        {/* Form Section */}
        <section style={styles.formSection}>
          <h2 style={styles.h2}>
            {editingItem ? 'Edit' : 'Add'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).slice(0, -1)}
          </h2>
          <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} style={styles.itemForm}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  style={styles.textarea}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  style={styles.input}
                />
              </div>

              {/* Dynamic fields based on active tab */}
              {activeTab === 'medicines' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Benefits (comma separated)</label>
                    <input
                      type="text"
                      value={formData.benefits.join(', ')}
                      onChange={(e) => handleArrayChange('benefits', e.target.value)}
                      placeholder="Promotes hair growth, Reduces hair fall"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      style={styles.input}
                    />
                  </div>
                </>
              )}

              {activeTab === 'recipes' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Dosha</label>
                    <select 
                      name="dosha" 
                      value={formData.dosha} 
                      onChange={handleInputChange}
                      style={styles.select}
                    >
                      <option value="">Select Dosha</option>
                      <option value="Vata">Vata</option>
                      <option value="Pitta">Pitta</option>
                      <option value="Kapha">Kapha</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Best Time</label>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="Morning, Evening, etc."
                      style={styles.input}
                    />
                  </div>
                </>
              )}

              {activeTab === 'yoga' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Difficulty</label>
                    <select 
                      name="difficulty" 
                      value={formData.difficulty} 
                      onChange={handleInputChange}
                      style={styles.select}
                    >
                      <option value="">Select Difficulty</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Standing, Seated, etc."
                      style={styles.input}
                    />
                  </div>
                </>
              )}

              {activeTab === 'remedies' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Purpose</label>
                    <input
                      type="text"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      placeholder="Digestive Issues, Skin Care, etc."
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Ingredients (comma separated)</label>
                    <input
                      type="text"
                      value={formData.ingredients.join(', ')}
                      onChange={(e) => handleArrayChange('ingredients', e.target.value)}
                      placeholder="Apple Cider Vinegar, Honey, Water"
                      style={styles.input}
                    />
                  </div>
                </>
              )}
            </div>

            <div style={styles.formActions}>
              <button type="submit" style={styles.submitBtn}>
                {editingItem ? 'Update' : 'Add'} Item
              </button>
              {editingItem && (
                <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Section */}
        <section style={styles.listSection}>
          <h2 style={styles.h2}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({(
              activeTab === 'medicines' ? medicines :
              activeTab === 'recipes' ? recipes :
              activeTab === 'yoga' ? yogaPoses : remedies
            ).length})
          </h2>
          <div style={styles.itemsGrid}>
            {(activeTab === 'medicines' ? medicines :
              activeTab === 'recipes' ? recipes :
              activeTab === 'yoga' ? yogaPoses : remedies).map(item => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.itemImage}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <div style={styles.imagePlaceholder}>No Image Available</div>
                  )}
                </div>
                <div style={styles.itemContent}>
                  <h3 style={styles.h3}>{item.name}</h3>
                  <p style={styles.p}>{item.description}</p>
                  
                  {activeTab === 'medicines' && (
                    <div style={styles.itemDetails}>
                      <div><strong>Benefits:</strong></div>
                      <ul style={styles.benefitsList}>
                        {item.benefits?.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                      <div><strong>Price:</strong> ${item.price}</div>
                    </div>
                  )}

                  {activeTab === 'recipes' && (
                    <div style={styles.itemDetails}>
                      <div><strong>Dosha:</strong> {item.dosha}</div>
                      <div><strong>Time:</strong> {item.time}</div>
                    </div>
                  )}

                  {activeTab === 'yoga' && (
                    <div style={styles.itemDetails}>
                      <div><strong>Difficulty:</strong> {item.difficulty}</div>
                      <div><strong>Category:</strong> {item.category}</div>
                    </div>
                  )}

                  {activeTab === 'remedies' && (
                    <div style={styles.itemDetails}>
                      <div><strong>For:</strong> {item.purpose}</div>
                      <div><strong>Ingredients:</strong></div>
                      <ul style={styles.benefitsList}>
                        {item.ingredients?.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={styles.itemActions}>
                    <button onClick={() => handleEditItem(item)} style={styles.editBtn}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteBtn}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;