import React from 'react'
import TemperatureGauge from '../components/Overview/TemperatureGauge'
import HumidityGauge from '../components/Overview/HumidityGauge'
import LuminosityChart from '../components/Overview/LuminosityChart'

export default function Overview({ sensors, luxSamples }) {
  return (
    <div>
      <h1 className="page-title">📊 Sensor Overview</h1>
      <section className="overview-grid">
        <TemperatureGauge value={sensors.temperature} />
        <HumidityGauge value={sensors.humidity} />
        <LuminosityChart data={luxSamples} />
      </section>
    </div>
  )
}
