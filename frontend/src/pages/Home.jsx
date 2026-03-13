import React from 'react';

function Home() {
  return (
    <div className="page fade-in">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to CSI Malayadi Church</h1>
          <p className="hero-subtitle">A place of worship, community, and peace.</p>
        </div>
        <div className="light-rays"></div>
        <div className="cross-silhouette"></div>
      </section>

      <section className="welcome-message">
        <h2>Join Us in Worship</h2>
        <p>
          We are a vibrant Christian community dedicated to following the teachings
          of Christ. Whether you are looking for a spiritual home or just exploring
          faith, you are welcome here.
        </p>
      </section>
    </div>
  );
}

export default Home;
