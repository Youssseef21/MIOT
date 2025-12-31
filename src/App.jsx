import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getSensors, getDevices, controlDevice, getHistory, sendIrCode } from './services/api'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import Overview from './pages/Overview'
import Controls from './pages/Controls'
import History from './pages/History'

export default function App(){
  const [sensors, setSensors] = useState({})
  const [devices, setDevices] = useState({})
  const [history, setHistory] = useState([])
  const [luxSamples, setLuxSamples] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchAll(){
    try{
      const s = await getSensors()
      const d = await getDevices()
      const h = await getHistory()
      setSensors(s)
      setDevices(d)
      setHistory(h)
      setLuxSamples(prev => [...prev.slice(-30), { time: new Date().toLocaleTimeString(), lux: s.luminosity || 0 }])
      setIsLoading(false)
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() => { 
    fetchAll()
    const t = setInterval(fetchAll, 5000)
    return ()=>clearInterval(t)
  }, [])

  if (isLoading) {
    return <Loading />
  }

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
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview sensors={sensors} luxSamples={luxSamples} />} />
            <Route path="/controls" element={<Controls devices={devices} toggleLedIr={toggleLedIr} setServo={setServo} setServoIr={setServoIr} />} />
            <Route path="/history" element={<History history={history} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
