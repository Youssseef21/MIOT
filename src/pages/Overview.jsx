import React from 'react'
import TemperatureGauge from '../components/Overview/TemperatureGauge'
import HumidityGauge from '../components/Overview/HumidityGauge'
import LuminosityChart from '../components/Overview/LuminosityChart'
import LuminosityValue from '../components/Overview/LuminosityValue'
import TemperatureChart from '../components/Overview/TemperatureChart'
import HumidityChart from '../components/Overview/HumidityChart'

export default function Overview({ sensors, luxSamples, tempSamples, humSamples }) {
  return (
    <div>
      <h1 className="page-title">📊 Sensor Overview</h1>
      <section className="overview-grid three-cols">
        <TemperatureGauge value={sensors.temperature} />
        <HumidityGauge value={sensors.humidity} />
        <LuminosityValue value={sensors.luminosity} />
      </section>

      <section className="overview-grid three-cols">
        <TemperatureChart data={tempSamples} />
        <HumidityChart data={humSamples} />
        <LuminosityChart data={luxSamples} />
      </section>
    </div>
  )
}
