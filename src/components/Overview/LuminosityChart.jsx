import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function LuminosityChart({ data }) {
  return (
    <div className="card">
      <h3>Luminosity (last samples)</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{fontSize:12}} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="lux" stroke="#3b82f6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
