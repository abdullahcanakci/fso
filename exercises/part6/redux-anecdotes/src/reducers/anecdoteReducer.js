import anecdoteService from './../services/anecdotes'

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedA = await anecdoteService.vote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: updatedA
    })
  }
}

export const createAnecdote = (content) =>  {
  return async dispatch => {
    const newA = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newA
    })
  }
}

export const initializeAnecdotes = (content) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT',
    data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const newState = state.map(s => s.id !== action.data.id ? s : action.data)
      return newState
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer 