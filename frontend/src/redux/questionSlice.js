/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        // this is the actual key that will be stored in the redux store
        questions: localStorage.getItem('questions') ? JSON.parse(localStorage.getItem('questions')) : [],
    },
    reducers: {
        getAllQuestions: (state, action) => {
            console.log('payload is ', action)
            let questions = localStorage.getItem('questions');
            if (questions == null) {
            } else {
                state.questions = JSON.parse(localStorage.getItem('questions'));
            }
        },
    },
});

export const { getAllQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
