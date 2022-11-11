import React from 'react'

interface Props {
  background?: string
  name: string
}

const Avatar = (props: Props) => {
  const { name, background = '#b5fa78' } = props
  return (
    <div
      style={{
        width: 32,
        height: 32,
        lineHeight: '32px',
        borderRadius: '100%',
        textAlign: 'center',
        fontSize: 18,
        background,
      }}
    >
      {name.slice(0, 1)}
    </div>
  )
}

export default Avatar
