import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id:2 },
    { name: 'Dan Abramov', number: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  const onFilter = (event) => {
    setFilter(event.target.value)
  }

  const onNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onHandleNewEntry = (event) => {
    event.preventDefault()

    if(persons.some(p => p.name === newName)){
      alert(`${newName} is already in the phonebook`)
      return
    }
    if(newNumber.length === 0){
      alert('Number cant be 0 characters')
      return
    }

    const p = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    setPersons(persons.concat(p))
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterState={filter} onChangeListener={onFilter}/>
      <PersonForm
        onNameInputChange={onNameInputChange}
        onNumberInputChange={onNumberInputChange}
        onHandleNewEntry={onHandleNewEntry}
        number={newNumber}
        name={newName}
        />
      <Persons persons={persons.filter(e => e.name.indexOf(filter) !== -1)} />
    </div>
  )
}

export default App