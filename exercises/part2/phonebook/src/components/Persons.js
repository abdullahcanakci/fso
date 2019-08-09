import React from 'react'

const Entry = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
  const entries = persons.map(person => <Entry key={person.id} person={person} />)
  return(
    <div>
      <h2>Numbers</h2>
      {entries}
    </div>
  )
}

export default Persons