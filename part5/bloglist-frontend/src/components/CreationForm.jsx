const CreationForm = ({
  title, setTitle,
  author, setAuthor,
  url, setUrl,
  handleCreation
}) => (
  <>
    <h2>Create new</h2>
    <form onSubmit={handleCreation}>
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
  </>
)

export default CreationForm
