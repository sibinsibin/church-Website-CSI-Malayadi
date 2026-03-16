import React, { useState, useEffect } from 'react';

function ServiceTimes() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/public/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Could not fetch services", err));
  }, []);

  return (
    <div className="page container fade-in">
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-small" style={{ margin: 0, width: '30px', height: '30px' }}>
          <path d="M12 2v20M7 7h10"/>
        </svg>
        Service Times
      </h1>
      <p className="subtitle">Join us for worship at the following times.</p>
      
      <div className="grid">
        {services.length === 0 ? (
          <p>Loading service times or none posted...</p>
        ) : (
          services.map(s => (
            <div className="card service-card" key={s.id}>
              <h2>{s.dayOfWeek}</h2>
              <div className="time">{s.time}</div>
              <p>{s.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ServiceTimes;
