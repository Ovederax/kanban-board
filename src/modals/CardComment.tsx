import React from 'react'
import { Comment } from '../services/types'
import { useUser } from '../providers/useUser'
import Avatar from '../ui/Avatar'

interface Props {
  comment: Comment
}

const CardComment = (props: Props) => {
  const { user } = useUser()
  const { comment } = props

  return (
    <div className="d-flex gap-2 align-items-center">
      <Avatar name={user?.name || 'Unknown'} />
      <span style={{ color: '#333' }}>{comment.text}</span>
    </div>
  )
}

export default CardComment
