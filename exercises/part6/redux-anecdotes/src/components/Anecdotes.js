import React from 'react'
import { connect } from 'react-redux'
import { vote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {
  console.log('Anecdotes redraw')

  const anecdoteViews = props.anecdotes.map(anecdote => {
    return (
      <Anecdote 
        key={anecdote.id} 
        anecdote={anecdote} 
        handleClick={() => {
          props.vote(anecdote)
          props.notify(`Voted ${anecdote.content}`, 3)
        }} 
      />
    )
  })
  return (
    <div>
      {anecdoteViews}
    </div>
  )
}

const filterAnecdotes = (anecdotes, filter) => {
  let response = anecdotes.filter(a => a.content.includes(filter))
  response = response.sort((a,b) => b.votes - a.votes)
  return response
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filterAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  vote,notify
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes