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
      console.log('state is ',state.userSlice)
      axios.get(config.BASE_URL + '/profile', {
        headers: {
          'Authorization': state.userSlice.profile.token
        }
      }).then(response => {
        if (response.status == 200 && response.data.statusCode == 200) {
          console.log('profile', response.data);
          // setSpaces(response.data.data.spaces);
        } else {
          console.log('some exception occurred', response)
        }
      }).catch(error => console.log('some exception occurred', error));
    }
  },
});

export const { addProfile, logout,refreshProfile } = userSlice.actions;

export default userSlice.reducer;
