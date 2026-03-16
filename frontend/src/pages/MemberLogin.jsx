import React, { useState } from 'react';

function MemberLogin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'member123') { // Simple MVP member password
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page container fade-in center-content">
        <div className="card login-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" className="icon-center" style={{ width: '48px', height: '48px' }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h2>Member Login</h2>
          <p className="subtitle">Access exclusive church member information.</p>
          <form className="admin-form" onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Member Password (member123)" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page container fade-in">
      <h1>Members Area</h1>
      <p className="subtitle">Welcome back, dear member. Peace be with you.</p>
      
      <div className="grid">
        <div className="card">
          <h2>Church Directory Update</h2>
          <p>Please ensure your contact details are updated with the parish secretary by the end of the month.</p>
        </div>
        <div className="card">
          <h2>Volunteer Schedule</h2>
          <ul className="list">
            <li><strong>Next Sunday:</strong> Youth Choir</li>
            <li><strong>Communion Prep:</strong> Women's Fellowship</li>
            <li><strong>Ushering:</strong> Team B</li>
          </ul>
        </div>
        <div className="card">
          <h2>Pastor's Message</h2>
          <p>"Rejoice in the Lord always. I will say it again: Rejoice!" - Philippians 4:4. Let us carry this joy into our week.</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn btn-danger" onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>
    </div>
  );
}

export default MemberLogin;
