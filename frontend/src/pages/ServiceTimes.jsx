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
      <h1>Service Times</h1>
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
