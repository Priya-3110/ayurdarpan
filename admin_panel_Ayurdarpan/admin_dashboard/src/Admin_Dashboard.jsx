

import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  // Data states
  const [medicines, setMedicines] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [yogaPoses, setYogaPoses] = useState([]);
  const [remedies, setRemedies] = useState([]);

  // Form states
  const [activeTab, setActiveTab] = useState('medicines');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    description: '',
    image: '',
    
    // Medicine specific
    benefits: '',
    price: '',
    
    // Recipe specific
    dosha: '',
    time: '',
    ingredients: [],
    procedure: [],
    nutrients: {
      Calories: '',
      Protein: '',
      Fat: '',
      Carbs: ''
    },
    
    // Yoga specific
    difficulty: '',
    category: '',
    sanskrit: '',
    durationMinutes: '',
    steps: [],
    
    // Remedy specific
    purpose: '',
    preparation: [],
    usage: '',
    frequency: '',
    precautions: ''
  });

  // API Base URL
  const API_BASE = 'http://localhost:5000/api';

  // Load data from backend
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      console.log('Fetching data from backend...');
      
      const [medsRes, recipesRes, yogaRes, remediesRes] = await Promise.all([
        fetch(`${API_BASE}/medicines`),
        fetch(`${API_BASE}/recipes`),
        fetch(`${API_BASE}/yoga`),
        fetch(`${API_BASE}/remedies`)
      ]);

      // Check if responses are ok
      if (!medsRes.ok) throw new Error('Medicines fetch failed');
      if (!recipesRes.ok) throw new Error('Recipes fetch failed');
      if (!yogaRes.ok) throw new Error('Yoga fetch failed');
      if (!remediesRes.ok) throw new Error('Remedies fetch failed');

      const medicinesData = await medsRes.json();
      const recipesData = await recipesRes.json();
      const yogaData = await yogaRes.json();
      const remediesData = await remediesRes.json();

      console.log('Raw data:', { medicinesData, recipesData, yogaData, remediesData });

      // Transform medicines data - UPDATED to match the working medicine dashboard
      setMedicines(medicinesData.map(item => ({
        id: item._id || item.id,
        name: item.name || '',
        price: item.price || 0,
        benefits: item.benefits || '',
        description: item.description || item.benefits || '',
        image: item.image || ''
      })));

      setRecipes(recipesData.map(item => ({
        id: item._id || item.id,
        name: item.title || item.name || '',
        description: item.description || '',
        dosha: item.dosha || '',
        time: item.time || '',
        ingredients: Array.isArray(item.ingredients) ? item.ingredients : 
                   (typeof item.ingredients === 'string' ? item.ingredients.split(',').map(i => i.trim()).filter(i => i) : []),
        procedure: Array.isArray(item.procedure) ? item.procedure : 
                  (typeof item.procedure === 'string' ? item.procedure.split('.').map(p => p.trim()).filter(p => p) : []),
        nutrients: item.nutrients || {},
        image: item.image || ''
      })));

      setYogaPoses(yogaData.map(item => ({
        id: item._id || item.id,
        name: item.title || item.name || '',
        description: item.description || '',
        difficulty: item.level || item.difficulty || 'Beginner',
        category: item.type || item.category || '',
        sanskrit: item.sanskrit || '',
        durationMinutes: item.durationMinutes || '',
        steps: Array.isArray(item.steps) ? item.steps : 
              (typeof item.steps === 'string' ? item.steps.split('.').map(s => s.trim()).filter(s => s) : []),
        image: item.image || ''
      })));

      setRemedies(remediesData.map(item => ({
        id: item._id || item.id,
        name: item.title || item.name || '',
        description: item.description || '',
        purpose: item.for || item.purpose || '',
        ingredients: Array.isArray(item.ingredients) ? item.ingredients : 
                    (typeof item.ingredients === 'string' ? item.ingredients.split(',').map(i => i.trim()).filter(i => i) : []),
        benefits: Array.isArray(item.benefits) ? item.benefits : 
                 (typeof item.benefits === 'string' ? item.benefits.split(',').map(b => b.trim()).filter(b => b) : []),
        preparation: Array.isArray(item.preparation) ? item.preparation : 
                    (typeof item.preparation === 'string' ? item.preparation.split('.').map(p => p.trim()).filter(p => p) : []),
        usage: item.usage || '',
        frequency: item.frequency || '',
        precautions: item.precautions || '',
        image: item.image || ''
      })));

      setApiMessage('Data loaded successfully!');

    } catch (error) {
      console.error('Error fetching data:', error);
      setApiMessage(`Error loading data: ${error.message}`);
    }
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === '12345') {
      setIsLoggedIn(true);
      setLoginError('');
      setApiMessage('Login successful!');
    } else {
      setLoginError('Invalid credentials. Use admin/12345');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setApiMessage('');
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item !== '')
    }));
  };

  const handleStepsChange = (value) => {
    setFormData(prev => ({
      ...prev,
      steps: value.split('.').map(item => item.trim()).filter(Boolean)
    }));
  };

  const handleProcedureChange = (value) => {
    setFormData(prev => ({
      ...prev,
      procedure: value.split('.').map(item => item.trim()).filter(Boolean)
    }));
  };

  const handlePreparationChange = (value) => {
    setFormData(prev => ({
      ...prev,
      preparation: value.split('.').map(item => item.trim()).filter(Boolean)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      benefits: '',
      price: '',
      dosha: '',
      time: '',
      ingredients: [],
      procedure: [],
      nutrients: {
        Calories: '',
        Protein: '',
        Fat: '',
        Carbs: ''
      },
      difficulty: '',
      category: '',
      sanskrit: '',
      durationMinutes: '',
      steps: [],
      purpose: '',
      preparation: [],
      usage: '',
      frequency: '',
      precautions: ''
    });
    setEditingItem(null);
    setApiMessage('');
  };

  // API CRUD Operations - UPDATED MEDICINE PART
  const handleAddItem = async (e) => {
    e.preventDefault();
    
    try {
      let endpoint = '';
      let payload = {};

      switch (activeTab) {
        case 'medicines':
          // UPDATED: Medicine payload to match working version
          endpoint = `${API_BASE}/medicines`;
          payload = {
            name: formData.name,
            price: parseFloat(formData.price) || 0,
            benefits: formData.benefits,
            description: formData.description,
            image: formData.image || ''
          };
          break;
        case 'recipes':
          endpoint = `${API_BASE}/recipes`;
          payload = {
            title: formData.name,
            description: formData.description,
            dosha: formData.dosha,
            time: formData.time,
            ingredients: formData.ingredients,
            procedure: formData.procedure,
            nutrients: formData.nutrients,
            image: formData.image || ''
          };
          break;
        case 'yoga':
          endpoint = `${API_BASE}/yoga`;
          payload = {
            title: formData.name,
            description: formData.description,
            level: formData.difficulty,
            type: formData.category,
            sanskrit: formData.sanskrit,
            durationMinutes: parseInt(formData.durationMinutes) || 0,
            steps: formData.steps,
            benefits: formData.description.split('. ').filter(Boolean),
            image: formData.image || ''
          };
          break;
        case 'remedies':
          endpoint = `${API_BASE}/remedies`;
          payload = {
            title: formData.name,
            description: formData.description,
            for: formData.purpose,
            ingredients: formData.ingredients,
            benefits: formData.benefits,
            preparation: formData.preparation,
            usage: formData.usage,
            frequency: formData.frequency,
            precautions: formData.precautions,
            image: formData.image || ''
          };
          break;
        default:
          return;
      }

      console.log(`Adding ${activeTab} item:`, payload);
      console.log('Endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setApiMessage(`${activeTab.slice(0, -1)} added successfully!`);
        await fetchData();
        resetForm();
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setApiMessage(`Failed to add ${activeTab.slice(0, -1)}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setApiMessage(`Error adding ${activeTab.slice(0, -1)}: ${error.message}`);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || item.title || '',
      description: item.description || '',
      image: item.image || '',
      benefits: item.benefits || '',
      price: item.price || '',
      dosha: item.dosha || '',
      time: item.time || '',
      ingredients: item.ingredients || [],
      procedure: item.procedure || [],
      nutrients: item.nutrients || {
        Calories: '',
        Protein: '',
        Fat: '',
        Carbs: ''
      },
      difficulty: item.difficulty || item.level || '',
      category: item.category || item.type || '',
      sanskrit: item.sanskrit || '',
      durationMinutes: item.durationMinutes || '',
      steps: item.steps || [],
      purpose: item.purpose || item.for || '',
      preparation: item.preparation || [],
      usage: item.usage || '',
      frequency: item.frequency || '',
      precautions: item.precautions || ''
    });
    setApiMessage(`Editing ${item.name || item.title}`);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    
    try {
      let endpoint = '';
      let payload = {};

      switch (activeTab) {
        case 'medicines':
          // UPDATED: Medicine payload to match working version
          endpoint = `${API_BASE}/medicines/${editingItem.id}`;
          payload = {
            name: formData.name,
            price: parseFloat(formData.price) || 0,
            benefits: formData.benefits,
            description: formData.description,
            image: formData.image || ''
          };
          break;
        case 'recipes':
          endpoint = `${API_BASE}/recipes/${editingItem.id}`;
          payload = {
            title: formData.name,
            description: formData.description,
            dosha: formData.dosha,
            time: formData.time,
            ingredients: formData.ingredients,
            procedure: formData.procedure,
            nutrients: formData.nutrients,
            image: formData.image || ''
          };
          break;
        case 'yoga':
          endpoint = `${API_BASE}/yoga/${editingItem.id}`;
          payload = {
            title: formData.name,
            description: formData.description,
            level: formData.difficulty,
            type: formData.category,
            sanskrit: formData.sanskrit,
            durationMinutes: parseInt(formData.durationMinutes) || 0,
            steps: formData.steps,
            benefits: formData.description.split('. ').filter(Boolean),
            image: formData.image || ''
          };
          break;
        case 'remedies':
          endpoint = `${API_BASE}/remedies/${editingItem.id}`;
          payload = {
            title: formData.name,
            description: formData.description,
            for: formData.purpose,
            ingredients: formData.ingredients,
            benefits: formData.benefits,
            preparation: formData.preparation,
            usage: formData.usage,
            frequency: formData.frequency,
            precautions: formData.precautions,
            image: formData.image || ''
          };
          break;
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setApiMessage(`${activeTab.slice(0, -1)} updated successfully!`);
        await fetchData();
        resetForm();
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setApiMessage(`Failed to update ${activeTab.slice(0, -1)}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setApiMessage(`Error updating ${activeTab.slice(0, -1)}: ${error.message}`);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        let endpoint = '';
        
        switch (activeTab) {
          case 'medicines':
            endpoint = `${API_BASE}/medicines/${id}`;
            break;
          case 'recipes':
            endpoint = `${API_BASE}/recipes/${id}`;
            break;
          case 'yoga':
            endpoint = `${API_BASE}/yoga/${id}`;
            break;
          case 'remedies':
            endpoint = `${API_BASE}/remedies/${id}`;
            break;
          default:
            return;
        }

        const response = await fetch(endpoint, {
          method: 'DELETE'
        });

        if (response.ok) {
          setApiMessage(`${activeTab.slice(0, -1)} deleted successfully!`);
          await fetchData();
        } else {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          setApiMessage(`Failed to delete ${activeTab.slice(0, -1)}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        setApiMessage(`Error deleting ${activeTab.slice(0, -1)}: ${error.message}`);
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
      border: '1px solid #fecaca',
      marginBottom: '16px'
    },
    successMessage: {
      background: '#f0fdf4',
      color: '#065f46',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '0.9rem',
      border: '1px solid #bbf7d0',
      marginBottom: '16px'
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
      gridTemplateColumns: '450px 1fr',
      gap: '32px',
      padding: '32px',
      maxWidth: '1600px',
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
      top: '20px',
      maxHeight: '90vh',
      overflowY: 'auto'
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
    textareaLarge: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '120px',
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
    nutrientsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px'
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
        {['medicines'].map(tab => (
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
          
          {apiMessage && (
            <div style={apiMessage.includes('Error') || apiMessage.includes('Failed') ? styles.errorMessage : styles.successMessage}>
              {apiMessage}
            </div>
          )}

          <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} style={styles.itemForm}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="Enter name"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed description"
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
                  placeholder="Enter image URL (optional)"
                  style={styles.input}
                />
              </div>

              {/* Dynamic fields based on active tab */}
              {activeTab === 'medicines' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Benefits *</label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      required
                      placeholder="Describe the benefits and uses of this medicine..."
                      style={styles.textarea}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="16.50"
                      required
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
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Ingredients (comma separated)</label>
                    <input
                      type="text"
                      value={formData.ingredients.join(', ')}
                      onChange={(e) => handleArrayChange('ingredients', e.target.value)}
                      placeholder="Turmeric, Milk, Honey"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Procedure Steps (separate with periods)</label>
                    <textarea
                      value={formData.procedure.join('. ')}
                      onChange={(e) => handleProcedureChange(e.target.value)}
                      placeholder="Mix ingredients. Heat gently. Let it cool."
                      style={styles.textareaLarge}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Nutritional Information</label>
                    <div style={styles.nutrientsGrid}>
                      <input
                        type="text"
                        placeholder="Calories"
                        value={formData.nutrients.Calories}
                        onChange={(e) => handleNestedInputChange('nutrients', 'Calories', e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Protein"
                        value={formData.nutrients.Protein}
                        onChange={(e) => handleNestedInputChange('nutrients', 'Protein', e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Fat"
                        value={formData.nutrients.Fat}
                        onChange={(e) => handleNestedInputChange('nutrients', 'Fat', e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Carbs"
                        value={formData.nutrients.Carbs}
                        onChange={(e) => handleNestedInputChange('nutrients', 'Carbs', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'yoga' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Difficulty Level</label>
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
                    <label style={styles.label}>Category/Type</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Standing, Seated, etc."
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Sanskrit Name</label>
                    <input
                      type="text"
                      name="sanskrit"
                      value={formData.sanskrit}
                      onChange={handleInputChange}
                      placeholder="Tadasana, etc."
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Duration (minutes)</label>
                    <input
                      type="number"
                      name="durationMinutes"
                      value={formData.durationMinutes}
                      onChange={handleInputChange}
                      placeholder="5"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Steps (separate with periods)</label>
                    <textarea
                      value={formData.steps.join('. ')}
                      onChange={(e) => handleStepsChange(e.target.value)}
                      placeholder="Stand straight. Place feet together. Raise arms overhead."
                      style={styles.textareaLarge}
                    />
                  </div>
                </>
              )}

              {activeTab === 'remedies' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Purpose (For)</label>
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
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Benefits (comma separated)</label>
                    <input
                      type="text"
                      value={formData.benefits.join(', ')}
                      onChange={(e) => handleArrayChange('benefits', e.target.value)}
                      placeholder="Improves digestion, Boosts immunity"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Preparation Steps (separate with periods)</label>
                    <textarea
                      value={formData.preparation.join('. ')}
                      onChange={(e) => handlePreparationChange(e.target.value)}
                      placeholder="Mix ingredients. Heat gently. Let it cool."
                      style={styles.textareaLarge}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Usage Instructions</label>
                    <textarea
                      name="usage"
                      value={formData.usage}
                      onChange={handleInputChange}
                      placeholder="Take one tablespoon daily after meals"
                      style={styles.textarea}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Frequency</label>
                    <input
                      type="text"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      placeholder="Once daily, Twice weekly, etc."
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Precautions</label>
                    <textarea
                      name="precautions"
                      value={formData.precautions}
                      onChange={handleInputChange}
                      placeholder="Not recommended for pregnant women"
                      style={styles.textarea}
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
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({((
              activeTab === 'medicines' ? medicines :
              activeTab === 'recipes' ? recipes :
              activeTab === 'yoga' ? yogaPoses : remedies
            ).length)}
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
                      <div><strong>Benefits:</strong> {item.benefits}</div>
                      <div><strong>Price:</strong> ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</div>
                    </div>
                  )}

                  {activeTab === 'recipes' && (
                    <div style={styles.itemDetails}>
                      <div><strong>Dosha:</strong> {item.dosha}</div>
                      <div><strong>Time:</strong> {item.time}</div>
                      <div><strong>Ingredients:</strong> {item.ingredients?.slice(0, 2).join(', ')}...</div>
                    </div>
                  )}

                  {activeTab === 'yoga' && (
                    <div style={styles.itemDetails}>
                      <div><strong>Difficulty:</strong> {item.difficulty}</div>
                      <div><strong>Category:</strong> {item.category}</div>
                      {item.sanskrit && <div><strong>Sanskrit:</strong> {item.sanskrit}</div>}
                      {item.durationMinutes && <div><strong>Duration:</strong> {item.durationMinutes} min</div>}
                    </div>
                  )}

                  {activeTab === 'remedies' && (
                    <div style={styles.itemDetails}>
                      <div><strong>For:</strong> {item.purpose}</div>
                      <div><strong>Ingredients:</strong></div>
                      <ul style={styles.benefitsList}>
                        {item.ingredients?.slice(0, 3).map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                        {item.ingredients?.length > 3 && (
                          <li>+{item.ingredients.length - 3} more</li>
                        )}
                      </ul>
                      <div><strong>Frequency:</strong> {item.frequency}</div>
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







