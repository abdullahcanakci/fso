import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = id => {
  const url = `${baseUrl}/${id}`
  return axios.delete(url)
}

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`
  return axios.put(url, newObject)
}

export default {
  getAll, create,deletePerson, update
}
