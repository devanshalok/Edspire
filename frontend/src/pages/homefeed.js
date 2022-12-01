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
import { Link, useNavigate } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import axios from 'axios';
import { getAllQuestions } from "../redux/questionSlice";
import config from "../config";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function HomeFeed() {
  const [questions, setQuestions] = useState([]);
  const [heading, setHeading] = useState("All Questions");
  let profile = useSelector(state => {
    console.log('useselector state is ', state.userSlice)
    if (state.userSlice.profile && state.userSlice.profile.token) {
      return state.userSlice.profile
    } return undefined
  })
  useEffect(() => {
    axios.get(config.BASE_URL + '/qa/questions', { headers: { 'Authorization': profile.token } }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setQuestions(response.data.data.questions)
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={9}>
        <Grid item xs={3}>
          <p style={{ fontWeight: "bold", marginTop: "20px", marginLeft: 10, fontSize: 20 }}>Questions</p><br></br>
          <Item style={{ marginLeft: 10, marginBottom: 5, fontSize: 15 }}>
            <Link style={{ textDecoration: "none", color: "black" }} onClick={() => setHeading("All Questions")}><p style={{ marginLeft: 20 }}>All Questions</p></Link>
          </Item>
          <Item style={{ marginLeft: 10, marginBottom: 5, fontSize: 15 }}>
            <Link style={{ textDecoration: "none", color: "black" }} onClick={() => setHeading("Un-Answered Questions")}><p style={{ marginLeft: 20 }}>Un-Answered Questions</p></Link>
          </Item>
          <Item style={{ marginLeft: 10, marginBottom: 5, fontSize: 15 }}>
            <Link style={{ textDecoration: "none", color: "black" }} onClick={() => setHeading("Followed Questions")}><p style={{ marginLeft: 20 }}>Followed Questions</p></Link>
          </Item>
        </Grid>
        <Grid item xs={6}> <p style={{ marginLeft: "20px", marginTop: "20px", fontSize: 20 }}>{heading}</p>
          {
            heading === 'Un-Answered Questions' ?
              (questions.filter(question => question.isUnAnswered).map(question => <RecipeReviewCard key={question._id} question={question} profile={profile}/>))
              : heading == 'Followed Questions' ?
                (questions.filter(question => profile.followedQuestions.includes(question._id)).map(question => <RecipeReviewCard key={question._id} question={question} profile={profile} />))
                : (questions.map(question => <RecipeReviewCard key={question._id} question={question} profile={profile}/>))
          }
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginTop: "20px", fontSize: 20, marginBottom: "20px" }}>Spaces Followed by you</p>
          {profile.followedSpaces.map(space => (<><Item style={{ marginBottom: 5, fontSize: 15, width: 250 }}>
            <Link style={{ textDecoration: "none", color: "black" }} to='../space' state={space}><p style={{ marginLeft: 20, fontSize: 14 }}><OpenInNewIcon style={{ fontSize: 20,color:"black" }} />{" "+space}</p></Link>
          </Item><Divider light /></>))}
        </Grid>

      </Grid>
    </Box>
  );
}
export default HomeFeed;