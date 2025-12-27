import React from 'react'
import { format } from 'date-fns'

export default function HistoryTable({ rows=[] }) {
  return (
    <div className="card">
      <h3>History</h3>
      <table className="history-table">
        <thead><tr><th>Timestamp</th><th>Device</th><th>Action</th><th>Source</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.timestamp}-${r.device}-${i}`}>
              <td>{r.timestamp ? format(new Date(r.timestamp), 'yyyy-MM-dd HH:mm:ss') : '-'}</td>
              <td>{r.device}</td>
              <td>{String(r.action)}</td>
              <td>{r.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
