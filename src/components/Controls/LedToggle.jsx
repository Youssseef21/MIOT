import React, { useState } from 'react'

export default function LedToggle({ label, device, value, onToggle, onIrToggle, disabled }) {
  const [loading, setLoading] = useState(false)
  const [irLoading, setIrLoading] = useState(false)
  
  async function handleRest(){
    setLoading(true)
    try { await onToggle(value === 'ON' ? 'OFF' : 'ON') }
    finally { setLoading(false) }
  }
  
  async function handleIr(){
    setIrLoading(true)
    try { await onIrToggle() }
    finally { setIrLoading(false) }
  }
  
  return (
    <div className="control-row">
      <div className="control-label">{label}</div>
      <div className="button-group">
        <button className={`btn ${value==='ON'?'on':'off'}`} onClick={handleRest} disabled={disabled||loading} title="REST API">
          {loading ? '...' : value || 'OFF'}
        </button>
        <button className="btn-ir" onClick={handleIr} disabled={disabled||irLoading} title="IR Remote">
          {irLoading ? '...' : '📡'}
        </button>
      </div>
    </div>
  )
}
