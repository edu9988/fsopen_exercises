import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      //console.log('current(state) now: ', current(state))
      //console.log('action', action)
      return state.map( anecdote => {
        return anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes+1 }
          : anecdote
      })
        .sort( (x,y) => {
          if( x.votes > y.votes )
            return -1
          else if( x.votes < y.votes )
            return 1
          else
            return 0
        })
    },
    create(state, action) {
      const content = action.payload
      state.push(content)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export default anecdoteSlice.reducer
