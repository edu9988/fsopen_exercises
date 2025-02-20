import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutPar from './components/LogoutPar'
import NotificationsField from './components/NotificationsField'
import CreationForm from './components/CreationForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({content:null,success:true})
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      showSuccess(`Login successful by ${user.name}`)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
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

  const handleCreation = async (event) => {
    event.preventDefault()

    try{
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url
      })

      showSuccess(`A new blog: ${title} by ${author} added`)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
            <CreationForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              handleCreation={handleCreation}
            />
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
