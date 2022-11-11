import { useContext } from 'react'
import { DashboardContext } from './DashboardProvider'

export const useDashboard = () => useContext(DashboardContext)
