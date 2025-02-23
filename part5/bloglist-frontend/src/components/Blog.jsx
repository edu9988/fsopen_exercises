import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {expand
        ? <>
            {blog.title} {blog.author}
            <button onClick={event => setExpand(false)}>
              hide
            </button>
            <br />{blog.url}
            <br />likes {blog.likes}
            <button onClick={event => handleLike(blog)}>like</button>
            <br />{blog.user.name}
          </>
        : <>
            {blog.title} {blog.author}
            <button onClick={event => setExpand(true)}>
              view
            </button>
          </>
      }
    </div>  
  )
}

export default Blog
