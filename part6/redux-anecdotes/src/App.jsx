import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </>
  )
}

export default App
