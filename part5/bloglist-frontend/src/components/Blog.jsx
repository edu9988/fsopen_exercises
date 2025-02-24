import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDeletion, owner }) => {
  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deletionStyle = {
    backgroundColor: '#2882fa'
  }

  return (
    <div style={blogStyle}>
      {expand
        ? <>
          {blog.title} {blog.author}
          <button onClick={() => setExpand(false)}>
            hide
          </button>
          <br />{blog.url}
          <br />likes {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
          <br />{blog.user.name}
          {owner && <>
            <br /><button
              style={deletionStyle}
              onClick={() => handleDeletion(blog.id)}
            >remove</button>
          </>}
        </>
        : <>
          {blog.title} {blog.author}
          <button onClick={() => setExpand(true)}>
            view
          </button>
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDeletion: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired
}

export default Blog
