import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SobrePage } from './pages/SobrePage';
import { CorePulsePage } from './pages/CorePulsePage';
import { GaragemPage } from './pages/GaragemPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/corepulse" element={<CorePulsePage />} />
          <Route path="/garagem" element={<GaragemPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};
