import React from 'react'
import { DashboardEntity } from '../../services/types'
import Avatar from '../../ui/Avatar'
import ActionButton from '../../ui/ActionButton'
import './dashboard-toolbar.scss'
import { useUser } from '../../providers/useUser'

interface Props {
  dashboard: DashboardEntity
}

const DashboardToolbar = (props: Props) => {
  const { dashboard } = props

  const { user } = useUser()

  return (
    <div className="dashboard-toolbar d-flex justify-content-between py-1 px-2 mb-1">
      <div className="d-flex align-items-center gap-3">
        <h5>{dashboard.name}</h5>
        <Avatar name={user?.name || 'Unknown'} />
        <ActionButton>Invite</ActionButton>
      </div>
    </div>
  )
}

export default DashboardToolbar
