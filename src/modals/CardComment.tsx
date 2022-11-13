import React from 'react'
import { Action, ActionType, Comment, RemoveComment } from '../services/types'
import { useUser } from '../providers/useUser'
import Avatar from '../ui/Avatar'
import EditableField from '../ui/EditableField'
import moment from 'moment'

interface Props {
  comment: Comment
  onApplyAction: (action: Action) => void
  columnId: number
  cardId: number
}

const dateFormat = (timestamp: string) => {
  return moment(timestamp).format('HH:mm MM/DD/YY')
}

const CardComment = (props: Props) => {
  const { user } = useUser()
  const { comment, onApplyAction, columnId, cardId } = props

  const onChangeComment = (newText: string) => {
    onApplyAction({
      type: ActionType.ChangeCommentText,
      columnId,
      cardId,
      commentId: comment.id,
      text: newText,
    })
  }
  const onRemoveComment = () => {
    onApplyAction({
      type: ActionType.RemoveComment,
      columnId,
      cardId,
      commentId: comment.id,
    })
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-2">
        <Avatar name={user?.name || 'Unknown'} />
        <div className="d-flex flex-column">
          <div className="d-flex gap-1 align-items-end">
            <span className="fs-5">{user?.name}</span>
            <span className="fs-6 text-muted">{dateFormat(comment.timestamp)}</span>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 32 }}>
        <EditableField text={comment.text} onChangeText={onChangeComment} />
        <span
          style={{ marginLeft: 8 }}
          className="fs-6 text-muted text-decoration-underline c-pointer"
          onClick={onRemoveComment}
        >
          Remove
        </span>
      </div>
    </div>
  )
}

export default CardComment
