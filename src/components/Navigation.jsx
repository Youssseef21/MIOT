import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="sidebar">
      <div className="nav-brand">
        <span className="nav-brand-icon">⚡</span>
        <span className="nav-brand-text">MIoT</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">📊</span>
          <span className="nav-text">Overview</span>
        </NavLink>
        
        <NavLink to="/controls" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">🎮</span>
          <span className="nav-text">Controls</span>
        </NavLink>
        
        <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">📈</span>
          <span className="nav-text">History</span>
        </NavLink>
      </div>
      
      <div className="nav-footer">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">Live</span>
        </div>
      </div>
    </nav>
  )
}
