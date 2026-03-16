import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay, parseISO, format } from 'date-fns';

function Home() {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [pastor, setPastor] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/public/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Could not fetch events", err));

    fetch('http://localhost:8080/api/public/festivals')
      .then(res => res.json())
      .then(data => setFestivals(data))
      .catch(err => console.error("Could not fetch festivals", err));

    fetch('http://localhost:8080/api/public/photos')
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(err => console.error("Could not fetch photos", err));

    fetch('http://localhost:8080/api/public/pastor')
      .then(res => res.json())
      .then(data => setPastor(data))
      .catch(err => console.error("Could not fetch pastor photo", err));
  }, []);

  const getDayContent = (date) => {
    const dayEvents = events.filter(e => isSameDay(parseISO(e.date), date));
    const dayFestivals = festivals.filter(f => isSameDay(parseISO(f.date), date));
    
    return [...dayEvents, ...dayFestivals];
  };

  const selectedDayItems = getDayContent(value);

  return (
    <div className="page fade-in">
      <section className="hero">
        {pastor && pastor.photoUrl && (
          <div className="pastor-photo-container">
            <img src={pastor.photoUrl} alt="Church Pastor" className="pastor-photo" />
          </div>
        )}
        <div className="hero-content">
          <div className="spiritual-icons">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon-dove">
              <path d="M3 13.5c0-2.5 2.5-4 4.5-3.5 1.5.5 3 1.5 4.5 2.5 1.5-1 3-2 4.5-2.5 2-.5 4.5 1 4.5 3.5 0 2-1.5 3-3 4-1.5 1-3 1.5-5 1.5s-3.5-.5-5-1.5c-1.5-1-3-2-3-4z"/>
              <path d="M13 3c-1.5 0-3 1.5-3 3.5-.5-1-2-2-3-2"/>
              <circle cx="16" cy="11.5" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <h1 className="hero-title">Welcome to CSI Malayadi Church</h1>
          <p className="hero-subtitle">A place of worship, community, and peace.</p>
        </div>
        <div className="light-rays"></div>
        <div className="cross-silhouette">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" style={{ width: '100%', height: '100%' }}>
            <path d="M12 2v20M5 8h14"/>
          </svg>
        </div>
      </section>

      <section className="welcome-message">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1" className="icon-flame icon-center">
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
        </svg>
        <h2>Join Us in Worship</h2>
        <p>
          We are a vibrant Christian community dedicated to following the teachings
          of Christ. Whether you are looking for a spiritual home or just exploring
          faith, you are welcome here.
        </p>
      </section>

      <section className="container" style={{ paddingTop: '0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Church Calendar</h2>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Calendar 
              onChange={onChange} 
              value={value}
              className="react-calendar-custom"
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const hasItems = getDayContent(date).length > 0;
                  return hasItems ? <div style={{ height: '8px', width: '8px', backgroundColor: 'var(--accent-red)', borderRadius: '50%', margin: '4px auto 0' }} /> : null;
                }
              }}
            />
          </div>
          <div className="card">
            <h3>Agenda for {format(value, 'MMM do, yyyy')}</h3>
            {selectedDayItems.length === 0 ? (
              <p style={{ color: 'var(--text-light)' }}>No scheduled events or festivals for this day.</p>
            ) : (
              <ul className="list">
                {selectedDayItems.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.title || item.name}</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--text-light)' }}>{item.description}</p>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ marginTop: '2rem' }}>
               <a href="/calendar" className="btn" style={{ display: 'inline-block', textDecoration: 'none' }}>View Full Calendar</a>
            </div>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="container fade-in" style={{ paddingTop: '0', paddingBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Church Memories & Highlights</h2>
          <div className="marquee-container card" style={{ padding: '2rem 0' }}>
            <div className="marquee-content">
              {/* Render twice for continuous seamless scrolling loop */}
              {photos.map((p, idx) => (
                <img key={`p1-${p.id || idx}`} src={p.url} alt={p.description} title={p.description} />
              ))}
              {photos.map((p, idx) => (
                <img key={`p2-${p.id || idx}`} src={p.url} alt={p.description} title={p.description} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
