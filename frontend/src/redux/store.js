/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    userSlice
  },
});
