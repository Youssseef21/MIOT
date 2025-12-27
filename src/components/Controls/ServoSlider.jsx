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
  
  return (
    <div className="card">
      <h4>Servo</h4>
      <input type="range" min="0" max="180" value={v} onChange={e=>setV(Number(e.target.value))} />
      <div className="servo-actions">
        <span>{v}°</span>
        <button onClick={() => onChange(v)} title="REST API">Set</button>
        <button className="btn-ir-small" onClick={() => handleIrControl(0)} disabled={irLoading} title="IR: Servo to 0°">0° 📡</button>
        <button className="btn-ir-small" onClick={() => handleIrControl(180)} disabled={irLoading} title="IR: Servo to 180°">180° 📡</button>
      </div>
    </div>
  )
}
