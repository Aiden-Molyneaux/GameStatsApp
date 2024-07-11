import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  username: string
}

const initialState: UserState = {
  username: 'Aiden'
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    changeNameAction: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeNameAction } = userSlice.actions;

export default userSlice.reducer;