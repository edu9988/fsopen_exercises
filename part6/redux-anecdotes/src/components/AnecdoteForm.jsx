import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const input = document.querySelector('form input')
    const newAnecdote = await anecdoteService.createNew(input.value)
    dispatch(create(newAnecdote))
    dispatch(setNotification(`You created "${input.value}"`))
    setTimeout(() => {
      dispatch(clearNotification())
      }, 5000
    )
    input.value = ''
  }

  return (
    <form>
      <div><input /></div>
      <button onClick={add}>create</button>
    </form>
  )
}

export default AnecdoteForm
