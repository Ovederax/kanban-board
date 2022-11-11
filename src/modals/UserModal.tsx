import React, { FormEventHandler, useCallback, useState } from 'react'
import { User } from '../services/types'
import Modal from '../ui/Modal'
import { Form } from 'react-bootstrap'
import { useFormState } from '../hooks/useFormState'
import { useRenewableRef } from '../hooks/useRenewableRef'

interface Props {
  show: boolean
  login: (user: User) => void
}

type FormState = {
  username: string
}

const initialState: FormState = {
  username: '',
}

const UserModal = (props: Props) => {
  const { show, login } = props
  const { formState, onChange } = useFormState(initialState)
  const usernameRef = useRenewableRef(formState.username)

  const onClickOk = useCallback(() => {
    login({
      id: 0,
      name: usernameRef.current,
    })
  }, [login, usernameRef])

  return (
    <Modal
      title="Authentication"
      show={show}
      hideCancel={true}
      onOk={onClickOk}
      okDisable={formState.username.trim() === ''}
      okText="Login"
    >
      <Form onChange={onChange} onSubmit={e => e.preventDefault()} autoComplete="off">
        <Form.Group className="mb-3">
          <Form.Label>Your username</Form.Label>
          <Form.Control
            aria-autocomplete="none"
            name="username"
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>
      </Form>
    </Modal>
  )
}

export default UserModal
