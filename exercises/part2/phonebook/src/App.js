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
  const [notification, setNotification] = useState({
    visible: false,
    name: '',
    success: ''
  })

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
        .then(response => {
          const updatedPerson = response.data
          setNotification({
            success: response.status === 200,
            visible: true,
            message: response.status === 200 ? `Updated ${updatedPerson.name}` : `Can't update ${newPerson.name}`
          })
          setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
        })
    } else {
      networkService
        .create(newPerson)
        .then(response => {
          console.log(response)
          const respPerson = response.data
          console.log(respPerson)
          setNotification({
            visible: true,
            success: response.status === 201,
            message: response.status === 201 ? `Added ${respPerson.name}` : `Can't add ${newPerson.name}`
          })
          setPersons(persons.concat(respPerson))
        }
      )
    }
    setNewName("")
    setNewNumber("")
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('id')

    const person = persons.find(p => p.id == id)

    if (window.confirm(`Delete ${person.name}`)) {
      networkService
        .deletePerson(id)
        .then(response => {
          if(response.status === 200){
            setNotification({
              success: true,
              visible: true,
              message: `${person.name} is deleted`
            })
            setPersons(persons.filter(p => p.id !== id))
          }
        })
        .catch(err => {
          setNotification({
            success: false,
            visible: true,
            message: `${person.name} can not be deleted`
          })
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const notificationView = () => {
    if(!notification.visible){
      return (<></>)
    }
    const type = notification.success ? 'success' : 'fail'
    setTimeout(() => {setNotification({visible: false})}, 3000);
    return (
      <p className={'notification ' + type}>{notification.message}</p>
    )
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      {notificationView()}
      <Filter filterState={filter} onChangeListener={onFilter} />
      <PersonForm
        onNameInputChange={onNameInputChange}
        onNumberInputChange={onNumberInputChange}
        onHandleNewEntry={onHandleNewEntry}
        number={newNumber}
        name={newName}
      />
      <Persons persons={persons.filter(p => p.name.indexOf(filter) !== -1)} deleteHandler={handleDelete} />
    </div>
  )
}

export default App