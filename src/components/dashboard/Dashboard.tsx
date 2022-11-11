import React from 'react'
import DashboardToolbar from './DashboardToolbar'
import { useDashboard } from '../../providers/useDashboard'
import CardColumn from '../card-columns/CardColumn'
import './dashboard.scss'

const Dashboard = () => {
  const { dashboard } = useDashboard()

  if (dashboard === null) {
    return <div>Loading...</div>
  }

  const { columns } = dashboard

  const columnComponents = columns.map((it, idx) => (
    <CardColumn key={idx} columnId={it.id} columnName={it.name} cards={it.cards} />
  ))

  return (
    <>
      <DashboardToolbar dashboard={dashboard} />
      <div
        style={{ height: 'calc(100vh - 112px)' }}
        className="dashboard d-flex w-100 gap-2 flex-grow-1"
      >
        {columnComponents}
      </div>
    </>
  )
}

export default Dashboard
