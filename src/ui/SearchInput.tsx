import React from 'react'
import { SearchSvg } from '../svg'

interface Props {
  onChange?: null
}

const SearchInput = (props: Props) => {
  const { onChange } = props

  return (
    <div className="input-group input-group-sm">
      <input
        type="search"
        className="form-control form-control-sm"
        style={{
          background: 'rgba(255,255,255, 0.2)',
          color: '#fff',
          padding: 8,
        }}
      />
      <div className="input-group-text" style={{}}>
        <SearchSvg />
      </div>
    </div>
  )
}

export default SearchInput
