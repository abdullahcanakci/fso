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
  let anecdotes = props.anecdotes
  anecdotes = anecdotes.filter(a => a.content.includes(props.filter))
  anecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
  const sortedAnecdotes = anecdotes.map(anecdote => {
    return (
      <Anecdote 
        key={anecdote.id} 
        anecdote={anecdote} 
        handleClick={() => {
          props.vote(anecdote.id)
          props.notify(`Voted ${anecdote.content}`)
          setTimeout(() => {props.notify('')}, 1000)
        }} 
      />
    )
  })
  return (
    <div>
      {sortedAnecdotes}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,notify
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes