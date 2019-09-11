export const notify =(message) => {
  return (
    {type:'SET', data: message}
  )
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data
    default:
      return state
  }
}

export default notificationReducer