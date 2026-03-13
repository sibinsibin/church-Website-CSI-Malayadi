import React, { useState, useEffect } from 'react';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    // In a real app, we would fetch from the backend
    fetch('http://localhost:8080/api/public/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Could not fetch events", err));

    fetch('http://localhost:8080/api/public/festivals')
      .then(res => res.json())
      .then(data => setFestivals(data))
      .catch(err => console.error("Could not fetch festivals", err));
  }, []);

  return (
    <div className="page container fade-in">
      <h1>Calendar & Events</h1>
      
      <div className="grid">
        <div className="card">
          <h2>Upcoming Festivals</h2>
          {festivals.length === 0 ? (
            <p>No upcoming festivals.</p>
          ) : (
            <ul className="list">
              {festivals.map(f => (
                <li key={f.id}>
                  <strong>{f.name}</strong> - {f.date}
                  <p>{f.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Church Events</h2>
          {events.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            <ul className="list">
              {events.map(e => (
                <li key={e.id}>
                  <strong>{e.title}</strong> - {e.date}
                  <p>{e.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
