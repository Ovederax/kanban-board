import React from 'react'
import { useDashboard } from '../providers/useDashboard'
import { ActionType } from '../services/types'
import { PlusSvg } from '../svg'
import './add-component.scss'

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
    <button
      className="btn btn-add-card w-100 mt-2 justify-content-start border-0 text-start p-1 d-flex align-items-center"
      onClick={onClick}
    >
      <PlusSvg height={24} width={24} />
      <span className="pb-1">Add a card</span>
    </button>
  )
}

export default React.memo(AddComponent)
