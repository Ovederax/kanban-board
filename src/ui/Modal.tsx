import React from 'react'
import BootstrapModal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import './modal.scss'

interface Props {
  size?: 'sm' | 'lg' | 'xl'
  fullscreen?: true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down'
  title: React.ReactNode
  show: boolean
  children: React.ReactNode
  hideCancel?: boolean
  cancelText?: string
  okText?: string
  onCancel?: () => void
  leftActions?: React.ReactNode
  okDisable?: boolean
  onOk: () => void
}

const Modal = (props: Props) => {
  const {
    title,
    show,
    okText = 'Ok',
    cancelText = 'Cancel',
    onCancel,
    onOk,
    children,
    hideCancel,
    okDisable = false,
    size,
    fullscreen,
    leftActions,
  } = props

  return (
    <BootstrapModal size={size} fullscreen={fullscreen} show={show} onHide={onCancel}>
      <BootstrapModal.Header closeButton={!hideCancel && !!onCancel}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>{children}</BootstrapModal.Body>

      <BootstrapModal.Footer className="d-flex justify-content-between">
        <div>{leftActions}</div>
        <div className="d-flex gap-2">
          {!hideCancel && (
            <Button variant="secondary" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button variant="primary" onClick={onOk} disabled={okDisable}>
            {okText}
          </Button>
        </div>
      </BootstrapModal.Footer>
    </BootstrapModal>
  )
}

export default Modal
