import React from 'react'
import { format } from 'date-fns'

export default function HistoryTable({ rows=[] }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{ fontSize: '28px' }}>📊</span>
        <h2 style={{ margin: 0 }}>Activity History</h2>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="history-table">
          <thead><tr><th>⏰ Timestamp</th><th>🎯 Device</th><th>⏮️ Prev State</th><th>⚡ Action</th></tr></thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>No activity recorded yet</td></tr>
            ) : (
              rows.map((r, i) => {
                const prev = r.prevState !== undefined && r.prevState !== null && r.prevState !== '' ? r.prevState : 'Unknown';
                const action = r.value || r.action;
                return (
                  <tr key={`${r.timestamp}-${r.type || r.device}-${i}`}>
                    <td>{r.timestamp ? format(new Date(r.timestamp), 'MMM dd, HH:mm:ss') : '-'}</td>
                    <td><strong>{r.type || r.device}</strong></td>
                    <td>{String(prev)}</td>
                    <td><span style={{ padding: '4px 10px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)', borderRadius: '6px', fontWeight: 600 }}>{String(action)}</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
