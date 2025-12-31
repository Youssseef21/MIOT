import React from 'react'

export default function LuminosityValue({ value }) {
  const display = value === undefined || value === null ? '—' : `${value} lux`
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(255, 221, 89, 0.12) 0%, rgba(255, 159, 28, 0.12) 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{ fontSize: '32px' }}>🌞</span>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: '16px' }}>Luminosity</h3>
      </div>
      <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{display}</div>
      <p style={{ marginTop: '6px', color: '#64748b', fontWeight: 600 }}>Current light level</p>
    </div>
  )
}
