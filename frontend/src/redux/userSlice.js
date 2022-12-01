/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const userSlice = createSlice({
  name: 'profile',
  initialState: {
    // this is the actual key that will be stored in the redux store
    profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {},
  },
  reducers: {
    addProfile: (state, action) => {
      console.log('payload is ', action)
      state.profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },

    logout: (state, action) => {
      console.log('logout now', action);
      state.profile = undefined;
      localStorage.clear();
    },
    refreshProfile: (state, action) => {
      console.log('payload is ', action);
      state.profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    }
  },
});

export const { addProfile, logout,refreshProfile } = userSlice.actions;

export default userSlice.reducer;
