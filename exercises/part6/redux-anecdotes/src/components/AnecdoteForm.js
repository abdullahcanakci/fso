import React from 'react'
import  {connect} from 'react-redux'
import {createAnecdote} from './../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault()
    const a = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(a)
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

export default connect(null, {createAnecdote}) (AnecdoteForm)