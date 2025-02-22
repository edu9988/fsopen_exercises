import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutPar from './components/LogoutPar'
import NotificationsField from './components/NotificationsField'
import CreationForm from './components/CreationForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({content:null,success:true})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccess = (text) => {
    setMsg({
      content: text,
      success: true
    })
    setTimeout(() => {
      setMsg({
        content: null,
        success: true
      })
    },5000)
  }

  const showFailure = (text) => {
    setMsg({
      content: text,
      success: false
    })
    setTimeout(() => {
      setMsg({
        content: null,
        success: true
      })
    },5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const tempUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(tempUser)
      )
      showSuccess(`Login successful by ${tempUser.name}`)
      setUser(tempUser)
      setUsername('')
      setPassword('')
      blogService.setToken(tempUser.token)
    }
    catch (exception){
      showFailure('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const blogFormRef = useRef()

  const handleCreation = async (blogObject) => {
    event.preventDefault()

    try{
      const blog = await blogService.create(blogObject)

      showSuccess(`A new blog: ${blogObject.title} by ${blogObject.author} added`)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
    }
    catch (exception){
      showFailure('Can\'t create blog')
    }
  }

  return (
    <>
      <h1>Blog List</h1>
      <NotificationsField message={msg} />
      {user === null
        ? <LoginForm
            handleLogin={handleLogin}
            user={username}
            setUser={setUsername}
            passwd={password}
            setPasswd={setPassword}
          />
        : <>
            <LogoutPar
              username={user.name}
              handleLogout={handleLogout}
            />
            <Toggleable buttonLabel="new blog" ref={blogFormRef}>
              <CreationForm
                handleCreation={handleCreation}
              />
            </Toggleable>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
      }
    </>
  )
}

export default App
