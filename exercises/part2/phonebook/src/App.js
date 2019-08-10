import React, { useState, useEffect } from 'react'
import networkService from './services/network'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    networkService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

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

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(p => p.name === newPerson.name && p.number !== newPerson.number)) {
      if (!window.confirm(`${newPerson.number} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      const id = persons.filter(p => p.name === newPerson.name)[0].id
      console.log(`${id} of person to be updated`)
      networkService
        .update(id, newPerson)
        .then(updated => setPersons(persons.map(p => p.id !== updated.id ? p : updated)))
    } else {
      networkService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        }
      )
    }
    setNewName("")
    setNewNumber("")
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('id')
    console.log(id)
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      networkService
        .deletePerson(person.id)
    }
    setPersons(persons.filter(p => p.id !== person.id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterState={filter} onChangeListener={onFilter} />
      <PersonForm
        onNameInputChange={onNameInputChange}
        onNumberInputChange={onNumberInputChange}
        onHandleNewEntry={onHandleNewEntry}
        number={newNumber}
        name={newName}
      />
      <Persons persons={persons.filter(e => e.name.indexOf(filter) !== -1)} deleteHandler={handleDelete} />
    </div>
  )
}

export default App