import React from 'react'

const Entry = ({ person, deleteHandler }) => {
  return (
    <li className='person' id={person.id}>
      {person.name} {person.number}
      <button id={person.id} onClick={deleteHandler}>delete</button>
    </li>
  )
}

const Persons = ({ persons, deleteHandler }) => {
  const entries = persons.map(person => <Entry key={person.id} person={person} deleteHandler={deleteHandler} />)
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {entries}
      </ul>
    </div>
  )
}

export default Persons