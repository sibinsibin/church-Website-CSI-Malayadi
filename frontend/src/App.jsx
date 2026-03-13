import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import ServiceTimes from './pages/ServiceTimes';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app-container content">
        <header className="navbar">
          <div className="logo">CSI Malayadi Church</div>
          <nav>
            <a href="/">Home</a>
            <a href="/services">Service Times</a>
            <a href="/calendar">Calendar</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceTimes />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} CSI Malayadi Church. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
