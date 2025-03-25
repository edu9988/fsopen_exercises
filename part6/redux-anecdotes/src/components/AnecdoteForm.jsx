import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const input = document.querySelector('form input')
    dispatch(createAnecdote(input.value))
    dispatch(setNotification(`You created "${input.value}"`, 5))
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
