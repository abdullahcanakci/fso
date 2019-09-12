export const notify =(message, secs) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: message
    })

    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, secs * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export default notificationReducer