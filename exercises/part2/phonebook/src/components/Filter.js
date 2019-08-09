import React from 'react'

const Filter = ({filterState, onChangeListener }) => {
  return (
    <div>
      <h2>Filter</h2>
      <input value={filterState} onChange={onChangeListener}/>
    </div>
  )
}

export default Filter