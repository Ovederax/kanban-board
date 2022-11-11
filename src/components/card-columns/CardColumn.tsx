import React, { useContext } from 'react'
import Card from '../card/Card'
import { ActionType, CardEntity, ChangeCardText, ChangeColumnName } from '../../services/types'
import AddComponent from '../AddComponent'
import './card-column.scss'
import EditableColumnName from '../../ui/EditableColumnName'
import { DashboardContext } from '../../providers/DashboardProvider'

interface Props {
  columnId: number
  columnName: string
  cards: CardEntity[]
}

const CardColumn = (props: Props) => {
  const { cards, columnId, columnName } = props
  const { onApplyAction } = useContext(DashboardContext)

  const onChangeColumnName = (text: string) => {
    const action: ChangeColumnName = {
      type: ActionType.ChangeColumnName,
      columnId,
      newColumnName: text,
    }
    onApplyAction(action)
  }

  return (
    <div className="card-column w-25 p-2 rounded-2 align-self-start">
      <EditableColumnName text={columnName} onChangeText={onChangeColumnName} />

      <div className="d-flex flex-column gap-1">
        {cards.map((it, idx) => {
          return <Card key={String(idx)} data={it} />
        })}
      </div>

      <AddComponent columnId={columnId} />
    </div>
  )
}

export default React.memo(CardColumn)
