import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const url = `${baseUrl}/${id}`
  return axios.delete(url)
}

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

export default {
  getAll, create,deletePerson, update
}