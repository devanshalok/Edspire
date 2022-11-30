/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'profile',
  initialState: {
    // this is the actual key that will be stored in the redux store
    profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {},
  },
  reducers: {
    addProfile: (state, action) => {
        console.log('payload is ',action)
      state.profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },

    logout: (state, action) => {
        console.log('logout now',action);
      state.profile = undefined;
      localStorage.clear();
    },
  },
});

export const { addProfile,logout } = userSlice.actions;

export default userSlice.reducer;
