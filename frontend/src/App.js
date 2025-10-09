import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Gallery from './components/Gallery';
import AdminPage from './components/AdminPage';
import './styles/App.css';

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="cool-container">    <div className={isAdminPage ? "App app-admin" : "App app-gallery"}>
      <nav style={{ padding: '1rem', background: 'rgba(30, 30, 30, 0.7)', textAlign: 'center', margin: '1rem', borderRadius: '8px' }}>
        <Link to="/" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none', fontSize: '1.2rem' }}>
          Home
        </Link>
        <Link to="/admin" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none', fontSize: '1.2rem' }}>
          Admin Page
        </Link>
      </nav>
      
      <Routes>
        <Route path="/" element={
          <>
            {/* <header className="app-header">
              <h1>My Collections</h1>
            </header> */}
            <main><Gallery /></main>
          </>
        } />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
    </div>

  );
}

// The main App component now just sets up the Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;