import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      /*
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      */
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    }
    catch (exception){
      console.error('handleLogin exception:',exception)
      /*
      setErrorMsg('Wrong credentials')
      setTimeout( () => {
        setErrorMsg(null)
      }, 5000)
      */
    }
  }

  if (user === null) {
    return (
      <>
        <h1>Blog List</h1>
        <LoginForm
          handleLogin={handleLogin}
          user={username}
          setUser={setUsername}
          passwd={password}
          setPasswd={setPassword}
        />
      </>
    )
  }

  return (
    <>
      <h1>Blog List</h1>
      <p>{user.name} logged-in</p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App
