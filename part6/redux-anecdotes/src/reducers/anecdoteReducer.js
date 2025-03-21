import { createSlice, current } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  //console.log('current(state) now: ', current(state))
  //console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      return state.map( anecdote => {
        return anecdote.id === action.payload.id
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
    case 'CREATE':
      return state.concat(asObject(action.payload.content))
    default:
      return state
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      console.log('current(state) now: ', current(state))
      console.log('action', action)
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
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    }
  }
})

export const { vote, create } = anecdoteSlice.actions
export default anecdoteSlice.reducer
