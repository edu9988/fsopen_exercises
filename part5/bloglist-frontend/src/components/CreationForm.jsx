import { useState } from 'react'

const CreationForm = ({ handleCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const sendBlogData = event => {
    event.preventDefault()

    handleCreation({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (<>
    <h2>Create new</h2>
    <form onSubmit={sendBlogData}>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input 
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input 
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>create</button>
    </form>
  </>)
}

export default CreationForm
