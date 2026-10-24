import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Smartphone, Monitor, User, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="navbar">
      <Link to="/" className="marca" onClick={fecharMenu}>
        <img src="/assets/logo-johndevs.jfif" alt="Logo John Dev's" />
        <span>John Dev's</span>
      </Link>

      {/* Botão Hambúrguer Mobile */}
      <button
        className="menu-mobile-btn"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Alternar menu de navegação"
      >
        {menuAberto ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Menu Links */}
      <nav className={`navbar-nav ${menuAberto ? 'aberto' : ''}`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'ativo' : '')} onClick={fecharMenu} end>
          <Home size={18} /> Início
        </NavLink>
        <NavLink to="/garagem" className={({ isActive }) => (isActive ? 'ativo' : '')} onClick={fecharMenu}>
          <Smartphone size={18} /> Garagem App
        </NavLink>
        <NavLink to="/corepulse" className={({ isActive }) => (isActive ? 'ativo' : '')} onClick={fecharMenu}>
          <Monitor size={18} /> CorePulse
        </NavLink>
        <NavLink to="/sobre" className={({ isActive }) => (isActive ? 'ativo' : '')} onClick={fecharMenu}>
          <User size={18} /> Sobre Mim
        </NavLink>
      </nav>
    </header>
  );
};
