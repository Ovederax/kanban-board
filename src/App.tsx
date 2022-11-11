import React from 'react'
import Dashboard from './components/dashboard/Dashboard'
import PageHeader from './components/page-header/PageHeader'
import UserModal from './modals/UserModal'
import { useUser } from './providers/useUser'

const App = () => {
  const { user, login } = useUser()

  const showContent = !!user

  return (
    <div className="app-container container-fluid">
      {showContent && <PageHeader />}
      {showContent && <Dashboard />}
      <UserModal show={!user} login={login} />
    </div>
  )
}

export default App
