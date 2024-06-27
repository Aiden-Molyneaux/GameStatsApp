import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  username: string
}

const initialState: CounterState = {
  username: 'Aiden'
}

export const counterSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    changeNameAction: (state, action: PayloadAction<string>) => {
      state.username = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const { changeNameAction } = counterSlice.actions

export default counterSlice.reducer