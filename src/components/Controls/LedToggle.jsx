import React, { useState } from 'react'

export default function LedToggle({ label, device, value, onToggle, onIrToggle, disabled }) {
  const [loading, setLoading] = useState(false)
  
  async function handleToggle(){
    setLoading(true)
    try { await onIrToggle() }
    finally { setLoading(false) }
  }
  
  const isOn = value === 'ON'
  
  return (
    <div className="control-row">
      <div className="control-label">
        <span style={{ fontSize: '20px', marginRight: '8px' }}>{isOn ? '💡' : '🔆'}</span>
        {label}
      </div>
      <button 
        className={`btn ${isOn ? 'on' : 'off'}`} 
        onClick={handleToggle} 
        disabled={disabled || loading}
        style={{ minWidth: '120px', fontSize: '16px' }}
        title="Toggle via IR Remote"
      >
        {loading ? '⏳ ...' : (isOn ? '✔️ ON' : '⭕ OFF')}
      </button>
    </div>
  )
}
