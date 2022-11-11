import React from 'react'
import { useDashboard } from '../providers/useDashboard'
import { ActionType } from '../services/types'
import { PlusSvg } from '../svg'

interface Props {
  columnId: number
}

const AddComponent = (props: Props) => {
  const { columnId } = props
  const { onApplyAction } = useDashboard()

  const onClick = () => {
    onApplyAction({
      type: ActionType.AddNewCard,
      columnId,
    })
  }

  return (
    <button className="btn btn-outline-secondary w-100 mt-3" onClick={onClick}>
      <PlusSvg />
      Add a card
    </button>
  )
}

export default React.memo(AddComponent)
