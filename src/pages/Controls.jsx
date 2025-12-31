import React from 'react'
import LedToggle from '../components/Controls/LedToggle'
import ServoSlider from '../components/Controls/ServoSlider'

export default function Controls({ devices, toggleLedIr, setServo, setServoIr, setAutoMode }) {
  const autoOn = String(devices.auto_mode || '').toUpperCase() === 'ON'

  return (
    <div>
      <h1 className="page-title">🎮 Device Control</h1>
      <section className="controls card">
        <h2>LED Controls</h2>
        <LedToggle 
          label="LED 1" 
          device="led1" 
          value={devices.led1} 
          onIrToggle={()=>toggleLedIr('led1')} 
        />
        <LedToggle 
          label="LED 2" 
          device="led2" 
          value={devices.led2} 
          onIrToggle={()=>toggleLedIr('led2')} 
        />

        <h2 style={{ marginTop: '24px' }}>Auto Mode</h2>
        <div className="control-row">
          <div className="control-label">
            <span style={{ fontSize: '20px', marginRight: '8px' }}>{autoOn ? '🤖' : '⏯️'}</span>
            Auto Mode
          </div>
          <button 
            className={`btn ${autoOn ? 'on' : 'off'}`} 
            style={{ minWidth: '120px', fontSize: '16px' }}
            onClick={() => setAutoMode(autoOn ? 'OFF' : 'ON')}
          >
            {autoOn ? 'ON' : 'OFF'}
          </button>
        </div>
        
        <h2 style={{ marginTop: '32px' }}>Servo Motor</h2>
        <ServoSlider 
          value={devices.servo} 
          onChange={setServo} 
          onIrControl={setServoIr} 
        />
      </section>
    </div>
  )
}
