
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './components/Gallery';
import AdminPage from './components/AdminPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App"> </div>
      <Routes>
        <Route path ="/" element ={
          <>
              <header className="app-header">
                <h1>My Collections</h1>
              </header>
              <main><Gallery /></main>
            </>
        } />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>

  );
}

export default App;
