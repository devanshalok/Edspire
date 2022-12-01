import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import RecipeReviewCard from "../components/answers";
import { GridListTile } from "@material-ui/core";
import "../App.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import BasicModalAnswer from "../components/basicmodalanswer";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import axios from "axios";
import config from "../config";
import moment from "moment";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function Answer() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  function handleModalOpen(state) {
    console.log('handle modal open called',state)
    setModalOpen(state)
  }
  console.log('modal open',modalOpen)
  const questionId = location.state
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function followQuestion() {
    let data = { questionId }
    axios.post(config.BASE_URL + '/follow-question', data, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data', response.data);
        // setSpaces(response.data.data.spaces);
        // handleClose();
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  let profile = useSelector(state => {
    if (state.userSlice.profile) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  })

  useEffect(() => {
    console.log('questionis', question)
    axios.get(config.BASE_URL + '/qa/question?questionId=' + questionId, { headers: { 'Authorization': profile.token } }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setQuestion(response.data.data.question)
        // state.questions = response.data.data.questions;
        // localStorage.setItem('questions', JSON.stringify(response.data.data.questions));
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ margin: "10px", marginTop: "40px" }} sx={{ maxWidth: 1000 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {question.createdBy && question.createdBy.firstname[0] + question.createdBy.lastname[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={question.createdBy && question.createdBy.firstname + " " + question.createdBy.lastname}
              subheader={moment(question.modifiedOn, config.DATE_FORMAT).fromNow() || ""}
            />

            <CardContent>
              <Typography variant="body1" color="text.primary" style={{ fontSize: "20px" }}>
                {question.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div style={{ margin: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <IconButton style={{ marginTop: "-0.2em" }} aria-label="share">
                  <Link style={{
                    textDecoration: "none", color: "black",
                    fontSize: "15px",
                    "&:hover": {
                      color: "yellow",
                      borderBottom: "1px solid white",
                    },
                  }} onClick={()=>handleModalOpen(true)} >
                    <ModeEditIcon style={{ fontSize: 20 }} />Answer Question
                  </Link>
                  {modalOpen && <BasicModalAnswer profile={profile} question={{ title: question.title, id: question._id }} handleModalOpen={handleModalOpen} modalOpen={modalOpen}/>}
                </IconButton>
                
          <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },

            }}>
              <FollowTheSignsIcon style={{ fontSize: 20 }} />{question && question.answers && question.answers.length} Answers</Link>
          </IconButton>
                <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },

            }}>
              <FollowTheSignsIcon style={{ fontSize: 20 }} />{question && question.followers} Followers</Link>
          </IconButton>
                {profile && profile.followedQuestions.includes(question._id) ? <>        <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },
            }} to="#">
              <FollowTheSignsIcon style={{ fontSize: 20 }} />Following</Link>
          </IconButton></>:<>        <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },

            }} onClick={followQuestion}>
              <FollowTheSignsIcon style={{ fontSize: 20 }} />Follow</Link>
          </IconButton></>}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{question.descr}</Typography>
              </CardContent>
            </Collapse>
          </Card>
          <Item style={{ marginTop: "30px" }}>
            <p style={{ fontSize: "20px", marginTop: "10px", marginLeft: "20px" }}>Answers</p>
            {question.answers && question.answers.map(answer =>
              <GridListTile > <RecipeReviewCard key={answer._id} answer={answer} /></GridListTile>
            )}
          </Item>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginTop: "20px", marginLeft: 10, marginRight: 20, fontSize: 20 }}>Related Questions</p><br></br>
          <Item style={{ marginTop: "-5px", marginLeft: 10, marginRight: 20, fontSize: 15 }}>

            <p style={{ marginLeft: 20, marginTop: 10 }}>Is a 332 GRE score sufficient to get into the top 5 universities?</p><br></br>
            <p style={{ marginLeft: 20 }}>How important is it to have high GRE scores when applying to grad school?</p><br></br>
            <p style={{ marginLeft: 20 }}>What universities can someone with a score of 301 on the GRE get into?</p><br></br>
            <p style={{ marginLeft: 20 }}>Will a GRE score of 295 give good colleges?</p><br></br>
            <p style={{ marginLeft: 20 }}>What is the best GRE score to get into the top fifteen universities?</p><br></br>
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}
export default Answer;