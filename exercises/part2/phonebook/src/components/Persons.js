import React from 'react'

const Entry = ({ person, deleteHandler }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button id={person.id} onClick={deleteHandler}>delete</button>
    </div>
  )
}

const Persons = ({ persons, deleteHandler }) => {
  const entries = persons.map(person => <Entry key={person.id} person={person} deleteHandler={deleteHandler} />)
  return (
    <div>
      <h2>Numbers</h2>
      {entries}
    </div>
  )
}

export default Persons