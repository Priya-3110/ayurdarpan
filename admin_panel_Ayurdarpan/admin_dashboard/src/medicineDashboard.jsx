// Medicine Dashboard with Image URL Support

import React, { useState, useEffect } from 'react';

const MedicineDashboard = () => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  // Data states
  const [medicines, setMedicines] = useState([]);

  // Form states
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    benefits: '',
    image: '' // ✅ added for image URL
  });

  // API Base URL
  const API_BASE = 'http://localhost:5000/api';

  // Load data from backend
  useEffect(() => {
    if (isLoggedIn) {
      fetchMedicines();
    }
  }, [isLoggedIn]);

  const fetchMedicines = async () => {
    try {
      const response = await fetch(`${API_BASE}/medicines`);
      if (!response.ok) throw new Error('Medicines fetch failed');

      const medicinesData = await response.json();
      setMedicines(medicinesData.map(item => ({
        id: item._id || item.id,
        name: item.name || '',
        price: item.price || 0,
        benefits: item.benefits || '',
        image: item.image || '' // ✅ include image field
      })));

      setApiMessage('Medicines loaded successfully!');
    } catch (error) {
      setApiMessage(`Error loading medicines: ${error.message}`);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setApiMessage('');
  };

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', benefits: '', image: '' });
    setEditingMedicine(null);
    setApiMessage('');
  };

  // Add medicine
  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price) || 0,
        benefits: formData.benefits,
        image: formData.image // ✅ include image URL
      };

      const response = await fetch(`${API_BASE}/medicines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setApiMessage('Medicine added successfully!');
        await fetchMedicines();
        resetForm();
      } else {
        setApiMessage(`Failed to add medicine: ${response.status}`);
      }
    } catch (error) {
      setApiMessage(`Error adding medicine: ${error.message}`);
    }
  };

  // Edit medicine
  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      price: medicine.price,
      benefits: medicine.benefits,
      image: medicine.image // ✅ populate image URL
    });
  };

  // Update medicine
  const handleUpdateMedicine = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price) || 0,
        benefits: formData.benefits,
        image: formData.image
      };

      const response = await fetch(`${API_BASE}/medicines/${editingMedicine.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setApiMessage('Medicine updated successfully!');
        await fetchMedicines();
        resetForm();
      } else {
        setApiMessage(`Failed to update medicine: ${response.status}`);
      }
    } catch (error) {
      setApiMessage(`Error updating medicine: ${error.message}`);
    }
  };

  // Delete medicine
  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const response = await fetch(`${API_BASE}/medicines/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setApiMessage('Medicine deleted successfully!');
          await fetchMedicines();
        } else {
          setApiMessage(`Failed to delete medicine: ${response.status}`);
        }
      } catch (error) {
        setApiMessage(`Error deleting medicine: ${error.message}`);
      }
    }
  };

  // Basic styles (same as before, shortened)
  const styles = {
    input: { padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' },
    textarea: { padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '80px' },
    button: { padding: '10px 16px', borderRadius: '6px', border: 'none', color: 'white', cursor: 'pointer' },
    medicineCard: { background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    medicineImage: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#eef2ff' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '350px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#4f46e5' }}>Medicine Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input type="text" placeholder="Username" value={loginData.username}
              onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))} style={styles.input} />
            <input type="password" placeholder="Password" value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))} style={styles.input} />
            {loginError && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}
            <button type="submit" style={{ ...styles.button, background: '#4f46e5' }}>Login</button>
          </form>
          <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#065f46', background: '#ecfdf5', padding: '10px', borderRadius: '6px' }}>
            Demo → Username: <b>admin</b> | Password: <b>12345</b>
          </p>
        </div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '30px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#4f46e5' }}>💊 Medicine Dashboard</h1>
        <button onClick={handleLogout} style={{ ...styles.button, background: '#dc2626' }}>Logout</button>
      </header>

      {apiMessage && (
        <div style={{
          background: apiMessage.includes('Error') ? '#fee2e2' : '#d1fae5',
          color: apiMessage.includes('Error') ? '#b91c1c' : '#065f46',
          padding: '10px', borderRadius: '6px', marginBottom: '20px'
        }}>
          {apiMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '30px' }}>
        {/* Form Section */}
        <form onSubmit={editingMedicine ? handleUpdateMedicine : handleAddMedicine} 
              style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange}
            placeholder="Medicine Name" required style={styles.input} />
          <input type="number" name="price" value={formData.price} onChange={handleInputChange}
            placeholder="Price" required style={styles.input} />
          <textarea name="benefits" value={formData.benefits} onChange={handleInputChange}
            placeholder="Benefits" required style={styles.textarea}></textarea>
          {/* ✅ Image URL field */}
          <input type="text" name="image" value={formData.image} onChange={handleInputChange}
            placeholder="Image URL (e.g. https://...)" style={styles.input} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ ...styles.button, background: '#10b981', flex: 1 }}>
              {editingMedicine ? 'Update' : 'Add'}
            </button>
            {editingMedicine && (
              <button type="button" onClick={resetForm} style={{ ...styles.button, background: '#6b7280' }}>Cancel</button>
            )}
          </div>
        </form>

        {/* Medicines List */}
        <div>
          <h2>Medicines ({medicines.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {medicines.length === 0 ? (
              <p>No medicines found.</p>
            ) : (
              medicines.map((medicine) => (
                <div key={medicine.id} style={styles.medicineCard}>
                  {/* ✅ Display image */}
                  {medicine.image && (
                    <img src={medicine.image} alt={medicine.name} style={styles.medicineImage} />
                  )}
                  <h3>{medicine.name}</h3>
                  <p style={{ color: '#10b981', fontWeight: 'bold' }}>${medicine.price.toFixed(2)}</p>
                  <p>{medicine.benefits}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => handleEditMedicine(medicine)} style={{ ...styles.button, background: '#3b82f6', flex: 1 }}>Edit</button>
                    <button onClick={() => handleDeleteMedicine(medicine.id)} style={{ ...styles.button, background: '#ef4444', flex: 1 }}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDashboard;
