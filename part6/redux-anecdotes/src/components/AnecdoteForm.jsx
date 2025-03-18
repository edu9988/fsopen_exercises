import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  return (
    <form>
      <div><input /></div>
      <button onClick={(event) => {
        event.preventDefault()
        const input = document.querySelector('form input')
        dispatch(create(input.value))
        input.value = ''
      }}>create</button>
    </form>
  )
}

export default AnecdoteForm
