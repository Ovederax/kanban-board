import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import dashboardService from '../services/DashboardService'
import { Action, DashboardEntity, CardEntity } from '../services/types'
import CardEditModal from '../modals/CardEditModal'
import { useCardEdit } from './hooks/useCardEdit'
import { noop } from '../utils'

interface DashboardData {
  dashboard: DashboardEntity | null
  onApplyAction: (action: Action) => void
  startEditCard: (card: CardEntity) => void
}

const defaultValue: DashboardData = {
  dashboard: null,
  onApplyAction: noop,
  startEditCard: noop,
}

export const DashboardContext = createContext<DashboardData>(defaultValue)

const DashboardProvider = (props: PropsWithChildren) => {
  const [dashboard, setDashboard] = useState<DashboardEntity | null>(null)
  const { showCardEdit, cardEditData, onCancelEditCard, startEditCard } = useCardEdit(dashboard)

  useEffect(() => {
    const dashboardData = dashboardService.getDashboard()
    setDashboard(dashboardData)
  }, [])

  const onApplyAction = useCallback((action: Action) => {
    const newDashboard = dashboardService.processAction(action)
    setDashboard(newDashboard)
  }, [])

  const value: DashboardData = useMemo(() => {
    return { dashboard, onApplyAction, startEditCard }
  }, [dashboard, onApplyAction, startEditCard])

  return (
    <DashboardContext.Provider value={value}>
      {props.children}
      <CardEditModal
        show={showCardEdit}
        cardEditData={cardEditData}
        onCancel={onCancelEditCard}
        onApplyAction={onApplyAction}
      />
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
