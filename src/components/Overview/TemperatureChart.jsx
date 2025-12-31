import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TemperatureChart({ data = [] }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{ fontSize: '32px' }}>🌡️</span>
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: '16px' }}>Temperature Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
          <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Line type="monotone" dataKey="value" stroke="url(#tempGradient)" strokeWidth={3} dot={false} />
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
