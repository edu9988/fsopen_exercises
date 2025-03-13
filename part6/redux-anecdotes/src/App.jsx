import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </>
  )
}

export default App
