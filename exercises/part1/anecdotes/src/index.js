import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({ title, anecdote, vote }) => {
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </div>
  )
}

const rand = (upperLimit, prevRand) => {
  console.log(upperLimit)
  const r = Math.floor(Math.random() * upperLimit)
  if (r === prevRand) {
    return rand(upperLimit, prevRand)
  }
  return r
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotedAnecdote, setmostVotedAnecdote] = useState(0)



  const handleRandQuote = () => {
    const t = rand(anecdotes.length, selected)
    setSelected(t)
  }

  const handleVote = () => {
    const c = [...votes]
    c[selected] += 1
    if (c[selected] >= c[mostVotedAnecdote]) {
      setmostVotedAnecdote(selected)
    }
    setVotes(c)
  }

  return (
    <div>
      <Anecdote
        title='Anecdote of the dat'
        anecdote={anecdotes[selected]}
        vote={votes[selected]} />
      <Button onClick={handleRandQuote} text='next quote' />
      <Button onClick={handleVote} text='vote' />
      <Anecdote
        title='Anecdote with most votes'
        anecdote={anecdotes[mostVotedAnecdote]}
        vote={votes[mostVotedAnecdote]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)