import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Anecdote from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import FilterForm from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  })
  
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

export default connect(null, { initializeAnecdotes })(App)