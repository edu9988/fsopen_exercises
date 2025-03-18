import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Nothing to declare',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
