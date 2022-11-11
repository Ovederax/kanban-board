import { useState } from 'react'
import { CardEntity, ColumnEntity, DashboardEntity } from '../../services/types'
import { useRenewableRef } from '../../hooks/useRenewableRef'

export interface CardData {
  cardEntity?: CardEntity
  parentColumnData?: ColumnEntity
}

export const useCardEdit = (dashboard: DashboardEntity | null) => {
  const dashboardRef = useRenewableRef(dashboard)
  const [showCardEdit, setShowCardEdit] = useState<boolean>(false)
  const [cardEditData, setCardEditData] = useState<CardData>({})

  const onCancelEditCard = () => {
    setShowCardEdit(false)
  }

  const startEditCard = (cardEntity: CardEntity) => {
    const currentDashboard = dashboardRef.current

    const parentColumnData = currentDashboard?.columns?.find(it => it.id === cardEntity.columnId)

    setShowCardEdit(true)
    setCardEditData({
      cardEntity,
      parentColumnData,
    })
  }

  return { cardEditData, showCardEdit, onCancelEditCard, startEditCard }
}
