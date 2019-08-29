import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.date)
}

const upvote = (targetObject) => {
  const request = axios.put(`${baseUrl}/${targetObject.id}`, { ...targetObject, likes: targetObject.likes + 1 })
  return request.then(response => response.data)
}

const deleteBlog = (targetObject) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${targetObject.id}`, config)
  
}

export default { getAll, create, update, upvote, deleteBlog, setToken }
