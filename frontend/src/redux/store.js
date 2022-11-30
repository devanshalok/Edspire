/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import questionsSlice from './questionSlice';

export default configureStore({
  reducer: {
    userSlice,questionsSlice
  },
});
