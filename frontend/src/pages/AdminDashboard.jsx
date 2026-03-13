import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([]);
  
  // New service state
  const [newDay, setNewDay] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = () => {
    fetch('http://localhost:8080/api/public/services')
      .then(res => res.json())
      .then(data => setServices(data));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple MVP auth
    if (token === 'supersecretadmintoken') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid token");
    }
  };

  const addService = async (e) => {
    e.preventDefault();
    const service = { dayOfWeek: newDay, time: newTime, description: newDesc };
    
    await fetch('http://localhost:8080/api/admin/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(service)
    });
    
    setNewDay('');
    setNewTime('');
    setNewDesc('');
    fetchData();
  };

  const deleteService = async (id) => {
    await fetch(`http://localhost:8080/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="page container fade-in center-content">
        <div className="card login-card">
          <h2>Admin Access</h2>
          <form className="admin-form" onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Admin Token" 
              value={token} 
              onChange={e => setToken(e.target.value)} 
              required
            />
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page container fade-in admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage church data.</p>
      
      <div className="admin-section card">
        <h2>Add Service Time</h2>
        <form className="admin-form" onSubmit={addService}>
          <input type="text" placeholder="Day (e.g. Sunday)" value={newDay} onChange={e => setNewDay(e.target.value)} required />
          <input type="text" placeholder="Time (e.g. 09:00 AM)" value={newTime} onChange={e => setNewTime(e.target.value)} required />
          <input type="text" placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} required />
          <button type="submit" className="btn">Add Service</button>
        </form>
      </div>

      <div className="admin-section card">
        <h2>Existing Services</h2>
        <ul className="list admin-list">
          {services.map(s => (
            <li key={s.id}>
              <div>
                <strong>{s.dayOfWeek}</strong> {s.time} - {s.description}
              </div>
              <button className="btn btn-danger" onClick={() => deleteService(s.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
