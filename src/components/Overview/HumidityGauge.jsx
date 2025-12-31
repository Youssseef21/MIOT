import React from 'react'
export default function HumidityGauge({ value }) {
  const display = value == null ? '--' : `${value.toFixed(0)}%`
  return (
    <div className="card gauge">
      <div style={{ fontSize: '48px', marginBottom: '8px' }}>💧</div>
      <div className="gauge-value">{display}</div>
      <div className="gauge-label">Humidity</div>
    </div>
  )
}
