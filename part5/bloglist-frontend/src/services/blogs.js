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
    headers: {Authorization:  token}
  }

  const blog = await axios.post(baseUrl, newBlog, config)
  return blog.data
}

export default { setToken, getAll, create }
