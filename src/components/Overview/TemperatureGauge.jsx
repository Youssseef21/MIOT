import React from 'react'

export default function TemperatureGauge({ value }) {
  const display = value == null ? '--' : `${value.toFixed(1)}°C`
  return (
    <div className="card gauge">
      <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌡️</div>
      <div className="gauge-value">{display}</div>
      <div className="gauge-label">Temperature</div>
    </div>
  )
}
