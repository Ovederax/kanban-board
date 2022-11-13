import { useMemo, useState } from 'react'
import { CardEntity, ColumnEntity, DashboardEntity } from '../../services/types'
import { useRenewableRef } from '../../hooks/useRenewableRef'

interface CardIds {
  cardId: number
  columnId: number
}

export interface CardData {
  cardEntity?: CardEntity
  parentColumnData?: ColumnEntity
}

export const useCardEdit = (dashboard: DashboardEntity | null) => {
  const dashboardRef = useRenewableRef(dashboard)
  const [showCardEdit, setShowCardEdit] = useState<boolean>(false)
  const [ids, setIds] = useState<CardIds>({ cardId: 0, columnId: 0 })

  const onCancelEditCard = () => {
    setShowCardEdit(false)
  }

  const startEditCard = (cardEntity: CardEntity) => {
    const currentDashboard = dashboardRef.current

    const parentColumnData = currentDashboard?.columns?.find(it => it.id === cardEntity.columnId)

    setShowCardEdit(true)
    setIds({
      cardId: cardEntity.id,
      columnId: cardEntity.columnId || 0,
    })
  }

  const cardEditData = useMemo<CardData>(() => {
    if (!dashboard) {
      return {}
    }
    const parentColumnData: ColumnEntity | undefined = dashboard.columns.find(
      it => it.id === ids.columnId,
    )
    const cardEntity: CardEntity | undefined = parentColumnData?.cards?.find(
      it => it.id === ids.cardId,
    )

    return {
      cardEntity,
      parentColumnData,
    }
  }, [dashboard, ids])

  return { cardEditData, showCardEdit, onCancelEditCard, startEditCard }
}
