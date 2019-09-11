export const filter = (keyword) => {
  return ({type: 'SET', data:keyword})
}

const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export default filterReducer