import React from 'react'
import { BoardsSvg, HomeSvg, InfoCircleSvg, NotificationSvg, PlusSvg } from '../../svg'
import ActionButton from '../../ui/ActionButton'
import SearchInput from '../../ui/SearchInput'
import './page-header.scss'
import Avatar from '../../ui/Avatar'
import { useUser } from '../../providers/useUser'

const PageHeader = () => {
  const { user } = useUser()

  return (
    <div className="page-header p-2 mb-2">
      <div className="d-flex gap-2 align-items-center w-33">
        <div>
          <ActionButton>
            <HomeSvg width={16} height={16} fill="#fff" />
          </ActionButton>
        </div>
        <div>
          <ActionButton>
            <BoardsSvg />
            <span className="ml-1">Boards</span>
          </ActionButton>
        </div>
        <div>
          <SearchInput />
        </div>
      </div>

      <h4 className="text-center w-33">Kanban board</h4>

      <div className="d-flex gap-2 w-33 justify-content-end">
        <ActionButton>
          <PlusSvg width={20} height={20} />
        </ActionButton>

        <ActionButton>
          <InfoCircleSvg width={18} height={18} />
        </ActionButton>

        <ActionButton>
          <NotificationSvg width={18} height={18} />
        </ActionButton>

        <Avatar name={user?.name || 'Unknown'} />
      </div>
    </div>
  )
}

export default PageHeader
