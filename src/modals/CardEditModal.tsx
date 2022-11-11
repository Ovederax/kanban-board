import React, { useEffect, useState } from 'react'
import {
  Action,
  ActionType,
  CardEntity,
  ChangeCardContent,
  Comment,
  RemoveCard,
  User,
} from '../services/types'
import Modal from '../ui/Modal'
import { Button, Form } from 'react-bootstrap'
import { TaskSvg } from '../svg'
import { CardData } from '../providers/hooks/useCardEdit'
import CardComment from './CardComment'

interface Props {
  show: boolean
  cardEditData: CardData
  onCancel: () => void
  onApplyAction: (action: Action) => void
}

const CardEditModal = (props: Props) => {
  const { show, cardEditData, onCancel, onApplyAction } = props
  const { cardEntity, parentColumnData } = cardEditData

  const [description, setDescription] = useState(cardEntity?.description || '')
  const [comments, setComments] = useState<Comment[]>(cardEntity?.comments || [])
  const [newCommentText, setNewCommentText] = useState('')

  useEffect(() => {
    if (show) {
      setDescription(cardEntity?.description || '')
      setComments(cardEntity?.comments || [])
    }
  }, [show])

  const modalTitle = (
    <div className="d-flex align-items-start gap-2">
      <TaskSvg className="mt-2" />
      <div className="d-flex flex-column">
        <span style={{ color: cardEntity?.text ? undefined : '#333' }}>
          {cardEntity?.text || 'Card without text'}
        </span>
        <span style={{ fontSize: '1rem', fontWeight: 400, marginLeft: 2 }}>{`In column: ${
          parentColumnData?.name || 'unknown'
        }`}</span>
      </div>
    </div>
  )

  const onChangeDescription: React.ChangeEventHandler<HTMLInputElement> = event => {
    setDescription(event.target.value)
  }

  const onChangeComment: React.ChangeEventHandler<HTMLInputElement> = event => {
    setNewCommentText(event.target.value)
  }

  const onAddComment = () => {
    const newComment: Comment = {
      userId: 0,
      text: newCommentText,
    }
    setNewCommentText('')
    setComments([...comments, newComment])
  }

  const onClickOk = () => {
    if (!cardEntity) {
      return
    }
    const action: ChangeCardContent = {
      type: ActionType.ChangeCardContent,
      columnId: cardEntity.columnId,
      cardId: cardEntity.id,
      newText: cardEntity.text,
      newDescription: description,
      newComments: comments,
    }
    onApplyAction(action)
    onCancel()
  }

  const removeCard = () => {
    if (!cardEntity) {
      return
    }
    const action: RemoveCard = {
      type: ActionType.RemoveCard,
      columnId: cardEntity.columnId,
      cardId: cardEntity.id,
    }
    onApplyAction(action)
    onCancel()
  }

  return (
    <Modal
      title={modalTitle}
      size="xl"
      fullscreen="lg-down"
      show={show}
      onOk={onClickOk}
      onCancel={onCancel}
      okDisable={false}
      okText="Save"
      leftActions={
        <Button variant="outline-danger" onClick={removeCard}>
          Remove card
        </Button>
      }
    >
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          type="text"
          placeholder="Enter description"
          onChange={onChangeDescription}
        />
      </Form.Group>
      <div className="d-flex flex-column mb-3 gap-2">
        <Form.Label>Comments:</Form.Label>
        {comments.length === 0 && <span style={{ color: '#bbb' }}>Ho have comments</span>}
        {comments.map(it => (
          // eslint-disable-next-line react/jsx-key
          <CardComment comment={it} />
        ))}
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Add new comment</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            value={newCommentText}
            type="text"
            placeholder="Enter new comment"
            onChange={onChangeComment}
          />
          <Button disabled={newCommentText.trim() === ''} onClick={onAddComment}>
            Add
          </Button>
        </div>
      </Form.Group>
    </Modal>
  )
}

export default CardEditModal
