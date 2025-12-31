import React from 'react'

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-icon">⚡</div>
        <h1 className="loading-title">MIoT Dashboard</h1>
        <p className="loading-subtitle">Smart Home Control System</p>
        
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        
        <p className="loading-status">Connecting to sensors...</p>
      </div>
    </div>
  )
}
