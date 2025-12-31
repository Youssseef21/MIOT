import React, { useState, useEffect } from 'react'

export default function ServoSlider({ value=90, onChange, onIrControl }) {
  const [v, setV] = useState(value || 90)
  const [irLoading, setIrLoading] = useState(false)
  
  useEffect(()=> setV(value ?? 90), [value])
  
  async function handleIrControl(position){
    setIrLoading(true)
    try { await onIrControl(position) }
    finally { setIrLoading(false) }
  }
  
  const percentage = (v / 180) * 100
  
  return (
    <div className="control-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '24px' }}>⚙️</span>
        <div className="control-label">Servo Motor</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>0°</span>
        <input 
          type="range" 
          min="0" 
          max="180" 
          value={v} 
          onChange={e=>setV(Number(e.target.value))} 
          style={{ '--value': `${percentage}%` }}
        />
        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>180°</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
        <span style={{ fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}°</span>
      </div>
      <div className="servo-actions">
        <button onClick={() => onChange(v)} title="Set angle via REST API" style={{ flex: 1 }}>✅ Set Angle</button>
        <button className="btn-ir-small" onClick={() => handleIrControl(0)} disabled={irLoading} title="Move to 0° via IR">📡 0°</button>
        <button className="btn-ir-small" onClick={() => handleIrControl(180)} disabled={irLoading} title="Move to 180° via IR">📡 180°</button>
      </div>
    </div>
  )
}
