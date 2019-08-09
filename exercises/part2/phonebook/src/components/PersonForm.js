import React from 'react'



const PersonForm = (props) => {
  const {name, number, onHandleNewEntry, onNumberInputChange, onNameInputChange} = props

  return (

    <form>
      <h2>Add a new number</h2>
      <div>
        name: <input value={name} onChange={onNameInputChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberInputChange} />
      </div>
      <div>
        <button type="submit" onClick={onHandleNewEntry}>add</button>
      </div>
    </form>

  )
}

export default PersonForm