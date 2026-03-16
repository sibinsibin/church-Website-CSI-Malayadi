import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [photos, setPhotos] = useState([]);
  
  // New service state
  const [newDay, setNewDay] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // New event state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');

  // New festival state
  const [newFestName, setNewFestName] = useState('');
  const [newFestDate, setNewFestDate] = useState('');
  const [newFestDesc, setNewFestDesc] = useState('');

  // New photo state
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [newPhotoDesc, setNewPhotoDesc] = useState('');

  // Pastor photo state
  const [newPastorPhoto, setNewPastorPhoto] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = () => {
    fetch('http://localhost:8080/api/public/services')
      .then(res => res.json())
      .then(data => setServices(data));
      
    fetch('http://localhost:8080/api/public/events')
      .then(res => res.json())
      .then(data => setEvents(data));

    fetch('http://localhost:8080/api/public/festivals')
      .then(res => res.json())
      .then(data => setFestivals(data));

    fetch('http://localhost:8080/api/public/photos')
      .then(res => res.json())
      .then(data => setPhotos(data));
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

  const addEvent = async (e) => {
    e.preventDefault();
    const event = { title: newEventTitle, date: newEventDate, description: newEventDesc };
    
    await fetch('http://localhost:8080/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(event)
    });
    
    setNewEventTitle(''); setNewEventDate(''); setNewEventDesc('');
    fetchData();
  };

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:8080/api/admin/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchData();
  };

  const addFestival = async (e) => {
    e.preventDefault();
    const festival = { name: newFestName, date: newFestDate, description: newFestDesc };
    
    await fetch('http://localhost:8080/api/admin/festivals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(festival)
    });
    
    setNewFestName(''); setNewFestDate(''); setNewFestDesc('');
    fetchData();
  };

  const deleteFestival = async (id) => {
    await fetch(`http://localhost:8080/api/admin/festivals/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchData();
  };

  const addPhoto = async (e) => {
    e.preventDefault();
    if (!newPhotoFile) return;

    const formData = new FormData();
    formData.append('file', newPhotoFile);
    formData.append('description', newPhotoDesc);

    await fetch('http://localhost:8080/api/admin/photos/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }, // Note: Do not set Content-Type for FormData, browser sets it boundary
      body: formData
    });
    
    setNewPhotoFile(null); setNewPhotoDesc('');
    // Clear the file input visually
    document.getElementById('photoInput').value = '';
    fetchData();
  };

  const deletePhoto = async (id) => {
    await fetch(`http://localhost:8080/api/admin/photos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchData();
  };

  const uploadPastorPhoto = async (e) => {
    e.preventDefault();
    if (!newPastorPhoto) return;

    const formData = new FormData();
    formData.append('file', newPastorPhoto);

    await fetch('http://localhost:8080/api/admin/pastor/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    setNewPastorPhoto(null);
    document.getElementById('pastorInput').value = '';
    alert("Pastor photo updated!");
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

      <div className="admin-section card">
        <h2>Add Event / Program</h2>
        <form className="admin-form" onSubmit={addEvent}>
          <input type="text" placeholder="Title" value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} required />
          <input type="date" placeholder="Date" value={newEventDate} onChange={e => setNewEventDate(e.target.value)} required />
          <input type="text" placeholder="Description" value={newEventDesc} onChange={e => setNewEventDesc(e.target.value)} required />
          <button type="submit" className="btn">Add Event</button>
        </form>
      </div>

      <div className="admin-section card">
        <h2>Existing Events</h2>
        <ul className="list admin-list">
          {events.map(e => (
            <li key={e.id}>
              <div>
                <strong>{e.title}</strong> - {e.date}
                <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.9rem'}}>{e.description}</p>
              </div>
              <button className="btn btn-danger" onClick={() => deleteEvent(e.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section card">
        <h2>Add Festival</h2>
        <form className="admin-form" onSubmit={addFestival}>
          <input type="text" placeholder="Name" value={newFestName} onChange={e => setNewFestName(e.target.value)} required />
          <input type="date" placeholder="Date" value={newFestDate} onChange={e => setNewFestDate(e.target.value)} required />
          <input type="text" placeholder="Description" value={newFestDesc} onChange={e => setNewFestDesc(e.target.value)} required />
          <button type="submit" className="btn">Add Festival</button>
        </form>
      </div>

      <div className="admin-section card">
        <h2>Existing Festivals</h2>
        <ul className="list admin-list">
          {festivals.map(f => (
            <li key={f.id}>
              <div>
                <strong>{f.name}</strong> - {f.date}
                <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.9rem'}}>{f.description}</p>
              </div>
              <button className="btn btn-danger" onClick={() => deleteFestival(f.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section card">
        <h2>Upload Event / Member Photo</h2>
        <form className="admin-form" onSubmit={addPhoto}>
          <input id="photoInput" type="file" accept="image/*" onChange={e => setNewPhotoFile(e.target.files[0])} required />
          <input type="text" placeholder="Short description or name" value={newPhotoDesc} onChange={e => setNewPhotoDesc(e.target.value)} required />
          <button type="submit" className="btn">Upload Photo</button>
        </form>
      </div>

      <div className="admin-section card">
        <h2>Existing Photos</h2>
        <ul className="list admin-list">
          {photos.map(p => (
            <li key={p.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={p.url} alt={p.description} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <strong>{p.description}</strong>
              </div>
              <button className="btn btn-danger" onClick={() => deletePhoto(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section card">
        <h2>Update Pastor Photo</h2>
        <form className="admin-form" onSubmit={uploadPastorPhoto}>
          <input id="pastorInput" type="file" accept="image/*" onChange={e => setNewPastorPhoto(e.target.files[0])} required />
          <button type="submit" className="btn">Upload Pastor Photo</button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
