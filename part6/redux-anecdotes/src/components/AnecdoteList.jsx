import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter( anecdote => anecdote.content.toLowerCase().includes( filter.toLowerCase() ) )
  })

  const dispatch = useDispatch()

  const voteAndNotify = (id) => {
    const content = anecdotes.find(anecdote => anecdote.id === id).content

    dispatch(vote(id))
    dispatch(setNotification(`You voted for "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
      }, 5000
    )
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAndNotify(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
