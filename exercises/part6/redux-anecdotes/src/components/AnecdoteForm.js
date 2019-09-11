import React from 'react'
import  {connect} from 'react-redux'
import {newAnecdote} from './../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.newAnecdote(content)
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(null, {newAnecdote}) (AnecdoteForm)