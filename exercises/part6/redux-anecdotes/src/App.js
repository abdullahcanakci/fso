import React from 'react'
import Anecdote from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import FilterForm from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  
  return (
    <div>
      <FilterForm />
      <AnecdoteForm/>
      <div><Notification /></div>
      <h2>Anecdotes</h2>
      <div><Anecdote /></div>
    </div>
  )
}

export default App