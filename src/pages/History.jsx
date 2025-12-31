import React from 'react'
import HistoryTable from '../components/History/HistoryTable'

export default function History({ history }) {
  return (
    <div>
      <h1 className="page-title">📈 Activity History</h1>
      <section className="history card">
        <HistoryTable rows={history} />
      </section>
    </div>
  )
}
