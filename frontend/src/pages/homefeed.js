import { Typography } from "@material-ui/core";
import RecipeReviewCard from "../components/card";
import StarIcon from '@mui/icons-material/Star';
import {
  GridList,
  ImageListItem,
  ListSubheader,
} from "@material-ui/core";
import "../App.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { getAllQuestions } from "../redux/questionSlice";
import config from "../config";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));


function HomeFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  // dispatch(getAllQuestions());

  let token = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile.token
    } return undefined
  })
  useEffect(() => {
    axios.get(config.BASE_URL + '/qa/questions', { headers: { 'Authorization': token } }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setQuestions(response.data.data.questions)
        // state.questions = response.data.data.questions;
        // localStorage.setItem('questions', JSON.stringify(response.data.data.questions));
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, [])
  // let questions = useSelector(state => {
  //   console.log('hello', state)
  //   if (state.questionsSlice) {
  //     console.log('state is ', state.questionsSlice)
  //     return state.questionsSlice
  //   } else {
  //   } return undefined
  // })
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <p style={{ fontWeight: "bold", marginTop: "20px", marginLeft: 10, fontSize: 20 }}>Questions</p><br></br>
          <Item style={{ marginTop: "-5px", marginLeft: 10, fontSize: 15 }}>

            <p style={{ marginLeft: 20, marginTop: 10 }}>Questions for you</p><br></br>
            <p style={{ marginLeft: 20 }}>Answer requests</p><br></br>
            <p style={{ marginLeft: 20 }}>Answers given</p><br></br>
          </Item>
        </Grid>
        <Grid item xs={6}> <p style={{ marginTop: "20px", fontSize: 20 }}><StarIcon style={{ marginLeft: 20 }} />Questions for you</p>
          {/* <Item style={{ marginTop: "30px" }}><ImageListItem > </ImageListItem>
            <ImageListItem > <RecipeReviewCard /></ImageListItem>
            <ImageListItem > <RecipeReviewCard /></ImageListItem></Item> */}
          {questions.map(question =>  <RecipeReviewCard key={question._id} question={question} />)}
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginTop: "20px", marginLeft: 10, fontSize: 20 }}>Topics You Know About</p><br></br>
          <Item style={{ marginTop: "-5px", marginLeft: 10, fontSize: 15 }}>

            <p style={{ marginLeft: 20, marginTop: 10 }}>Housing In USA</p><br></br>
            <p style={{ marginLeft: 20 }}>GRE help</p><br></br>
            <p style={{ marginLeft: 20 }}>Scholarship Help</p><br></br>
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}
export default HomeFeed;