import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: {Authorization: token}
  }

  const blog = await axios.post(baseUrl, newBlog, config)
  return blog.data
}

const update = async (blogId, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: {Authorization: token}
  }

  return await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { setToken, getAll, create, update, remove }
