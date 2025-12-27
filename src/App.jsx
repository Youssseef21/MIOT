import React, { useEffect, useState } from 'react'
import { getSensors, getDevices, controlDevice, getHistory, sendIrCode } from './services/api'
import TemperatureGauge from './components/Overview/TemperatureGauge'
import HumidityGauge from './components/Overview/HumidityGauge'
import LuminosityChart from './components/Overview/LuminosityChart'
import LedToggle from './components/Controls/LedToggle'
import ServoSlider from './components/Controls/ServoSlider'
import HistoryTable from './components/History/HistoryTable'

export default function App(){
  const [sensors, setSensors] = useState({})
  const [devices, setDevices] = useState({})
  const [history, setHistory] = useState([])
  const [luxSamples, setLuxSamples] = useState([])

  async function fetchAll(){
    try{
      const s = await getSensors()
      const d = await getDevices()
      const h = await getHistory()
      setSensors(s)
      setDevices(d)
      setHistory(h)
      setLuxSamples(prev => [...prev.slice(-30), { time: new Date().toLocaleTimeString(), lux: s.luminosity || 0 }])
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() => { fetchAll(); const t = setInterval(fetchAll, 5000); return ()=>clearInterval(t); }, [])

  async function toggleLed(device, action){ await controlDevice(device, action); await fetchAll(); }
  async function toggleLedIr(device){ 
    const irCmd = device === 'led1' ? 'led1_toggle' : 'led2_toggle'
    await sendIrCode(irCmd)
    await fetchAll()
  }
  async function setServo(angle){ await controlDevice('servo', angle); await fetchAll(); }
  async function setServoIr(position){
    const irCmd = position === 180 ? 'servo_180' : 'servo_0'
    await sendIrCode(irCmd)
    await fetchAll()
  }

  return (
    <div className="app">
      <header className="app-header">IoT Control System — Dashboard</header>
      <main>
        <section className="overview-grid">
          <TemperatureGauge value={sensors.temperature} />
          <HumidityGauge value={sensors.humidity} />
          <LuminosityChart data={luxSamples} />
        </section>

        <section className="controls">
          <h2>Device Control</h2>
          <LedToggle label="LED 1" device="led1" value={devices.led1} onToggle={(a)=>toggleLed('led1', a)} onIrToggle={()=>toggleLedIr('led1')} />
          <LedToggle label="LED 2" device="led2" value={devices.led2} onToggle={(a)=>toggleLed('led2', a)} onIrToggle={()=>toggleLedIr('led2')} />
          <ServoSlider value={devices.servo} onChange={setServo} onIrControl={setServoIr} />
        </section>

        <section className="history">
          <HistoryTable rows={history} />
        </section>
      </main>
    </div>
  )
}
