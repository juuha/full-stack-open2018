import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, newNumber)
}

export default { getAll, create, destroy , update }