import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { PencilSvg } from '../svg'
import './editable-field..scss'

interface Props {
  text: string
  onChangeText: (text: string) => void
  onClickPencil?: () => void
}

const EmptyCardText = () => {
  return <span style={{ color: '#bbb' }}>Please fill text of card</span>
}

const EditableField = (props: Props) => {
  const { text, onClickPencil } = props
  const saveButtonRef = useRef(null)
  const [isEdit, setIsEdit] = useState(false)
  const [savedText, setSavedText] = useState('')

  useEffect(() => {
    setSavedText(text)
  }, [text])

  const onStartEdit = () => {
    setIsEdit(true)
  }

  const onCancelEdit = () => {
    setSavedText(text)
    setIsEdit(false)
  }

  const onBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === saveButtonRef.current) {
      return
    }
    onCancelEdit()
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSavedText(e.target.value)
  }

  const onSave = () => {
    props.onChangeText(savedText)
    setIsEdit(false)
  }

  if (isEdit) {
    return (
      <div className="d-flex flex-column gap-2 p-2">
        <Form.Control
          autoFocus
          value={savedText}
          as="textarea"
          rows={3}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={onCancelEdit}>
            Cancel
          </Button>
          <Button ref={saveButtonRef} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-field">
      <div className="flex-grow-1 c-pointer flex-grow-1" onClick={onStartEdit}>
        {text.trim() !== '' ? text : <EmptyCardText />}
      </div>
      {onClickPencil && <PencilSvg onClick={onClickPencil} className="pencil" />}
    </div>
  )
}

export default EditableField
