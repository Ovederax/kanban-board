import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './editable-field..scss'

interface Props {
  text: string
  onChangeText: (text: string) => void
}

const EmptyColumnTitle = () => {
  return <span style={{ color: '#bbb' }}>Please fill text of column</span>
}

const EditableColumnName = (props: Props) => {
  const { text } = props

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

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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

  const onKeyDown: KeyboardEventHandler = event => {
    if (event.keyCode == 27) {
      onCancelEdit()
    }
    if (event.keyCode == 13) {
      onSave()
    }
  }

  if (isEdit) {
    return (
      <div className="d-flex gap-2 mb-2" style={{ height: 40 }}>
        <Form.Control
          tabIndex={1}
          value={savedText}
          as="input"
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus
        />

        <Button ref={saveButtonRef} onClick={onSave}>
          Save
        </Button>
      </div>
    )
  }

  return (
    <div className="card-field mb-0 flex-grow-1 c-pointer" onClick={onStartEdit}>
      {text.trim() !== '' ? <h5>{text}</h5> : <EmptyColumnTitle />}
    </div>
  )
}

export default EditableColumnName
