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
  const [msg, setMsg] = useState({ content:null,success:true })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((x,y) => {
        if( x.likes > y.likes )
          return -1
        else if( x.likes < y.likes )
          return 1
        else
          return 0
      }))
    )
      .catch(error => console.log('getAll() failed'))
  }, [])

  useEffect(() => {
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
    try{
      const blog = await blogService.create(blogObject)

      showSuccess(`A new blog: "${blogObject.title}" by ${blogObject.author} added`)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
    }
    catch (exception){
      showFailure('Failed to create blog')
    }
  }

  const handleLike = async (oldBlog) => {
    oldBlog.likes = oldBlog.likes+1

    const blogPayload = {
      title: oldBlog.title,
      author: oldBlog.author,
      url: oldBlog.url,
      likes: oldBlog.likes,
      user: oldBlog.user.id
    }

    try{
      await blogService.update(oldBlog.id, blogPayload)
      showSuccess(`Added like to blog "${oldBlog.title}"`)

      setBlogs(blogs
        .map( blog => {
          return blog.id === oldBlog.id
            ? oldBlog
            : blog
        })
        .sort( (x,y) => {
          if( x.likes > y.likes )
            return -1
          else if( x.likes < y.likes )
            return 1
          else
            return 0
        })
      )
    }
    catch (exception){
      showFailure('Failed to update likes')
    }
  }

  const handleDeletion = async (blogId) => {
    const targetBlog = blogs
      .find(blog => blog.id === blogId)
    const blogTitle = targetBlog.title
    const blogAuthor = targetBlog.author

    if( window.confirm(
      `Delete "${blogTitle}" by ${blogAuthor}?`
    )){
      try{
        await blogService.remove(blogId)
        showSuccess(`Deleted "${blogTitle}" by ${blogAuthor}`)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
      }
      catch (exception){
        showFailure(`Failed to delete "${blogTitle}" by ${blogAuthor}: ${exception}`)
      }
    }
  }

  return (<>
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
        {blogs.length
          ? <h2>blogs</h2>
          : <h2>no blogs</h2>
        }
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDeletion={handleDeletion}
            owner={blog.user.username === user.username}
          />
        )}
      </>
    }
  </>)
}

export default App
