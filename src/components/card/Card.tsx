import React, { MouseEventHandler, useContext } from 'react'
import { ActionType, ChangeCardText, CardEntity } from '../../services/types'
import { DashboardContext } from '../../providers/DashboardProvider'
import EditableField from '../../ui/EditableField'
import { CommentsSvg, PencilSvg } from '../../svg'
import './card.scss'

interface Props {
  data: CardEntity
}

const Card = (props: Props) => {
  const { onApplyAction, startEditCard } = useContext(DashboardContext)
  const { data } = props
  const { text } = data

  const onChangeText = (text: string) => {
    const action: ChangeCardText = {
      type: ActionType.ChangeCardText,
      cardId: data.id,
      columnId: data.columnId,
      newText: text,
    }
    onApplyAction(action)
  }

  const onClickEditCard = () => {
    startEditCard(data)
  }

  const hasText = text.trim() !== ''

  return (
    <div className="card dashboard-card bg-white rounded-2 p-2">
      <EditableField text={text} onChangeText={onChangeText} onClickPencil={onClickEditCard} />
      <div className="d-flex mt-1 justify-content-start gap-2 px-2">
        <div className="card-comments d-flex gap-1 align-items-center">
          <CommentsSvg fill="#8F8F91" /> <span>{data.comments.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
