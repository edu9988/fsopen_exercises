import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  return (
    <form>
      <div><input /></div>
      <button onClick={(event) => {
        event.preventDefault()
        const input = document.querySelector('form input')
        dispatch(create(input.value))
        dispatch(setNotification(`You created "${input.value}"`))
        setTimeout(() => {
          dispatch(clearNotification())
          }, 5000
        )
        input.value = ''
      }}>create</button>
    </form>
  )
}

export default AnecdoteForm
