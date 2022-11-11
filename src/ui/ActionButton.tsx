import React from 'react'

interface Props {
  onClick?: () => void
  children: React.ReactNode
}

const ActionButton = (props: Props) => {
  const { onClick, children } = props

  return (
    <button
      onClick={onClick}
      className="btn btn-secondary d-flex gap-1 align-items-center"
      style={{
        height: 32,
      }}
    >
      {children}
    </button>
  )
}

export default ActionButton
