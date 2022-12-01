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
import Alert from '@mui/material/Alert';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import getProfile from "../utils";
import { refreshProfile } from "../redux/userSlice";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <><p style={{marginLeft:10,marginTop:14,fontWeight:'bold'}}>Expand Question</p><IconButton {...other} /></>;
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
  const [alert, setAlert] = React.useState("");

  let profile = useSelector(state => {
    if (state.userSlice.profile) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  })
  function handleModalOpen(state) {
    console.log('handle modal open called',state)
    setModalOpen(state)
  }
  console.log('modal open',modalOpen)
  const [questionId,setQuestionId] = useState(location.state);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function handleAnswerAdded(state){
    setModalOpen(state);
    getQuestionData();
  }
  const [followers,setFollowers] = React.useState(0);
  function followQuestion() {
    let data = { questionId }
    console.log('data is',data,questionId)
    axios.post(config.BASE_URL + '/follow-question', data, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data', response.data);
        // setSpaces(response.data.data.spaces);
        // handleClose();
        let alert = (<Alert severity="success">Question followed Successfully</Alert>);
        setAlert(alert);
        setTimeout(() => setAlert(), 3000);
        setFollowers(followers+1);
        getProfile(profile.token).then(response => {
          console.log('response', response);
          dispatch(refreshProfile(response));

        })

        // dispatch(refreshProfile( ));
        // props.profile.token))
      } else {
        alert = (<Alert severity="error">Some error occurred while following question</Alert>);
        setAlert(alert);
        setTimeout(() => setAlert(), 3000);
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  
  function unfollowQuestion() {
    let data = { questionId};
    console.log('unfollow data is',data,questionId)

    axios.post(config.BASE_URL + '/unfollow-question', data, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data', response.data);
        // setSpaces(response.data.data.spaces);
        // handleClose();
        getProfile(profile.token).then(response => {
          console.log('response', response);
          dispatch(refreshProfile(response));
          setFollowers(followers-1);
        })
        let alert = (<Alert severity="success">Question Un-Followed Successfully</Alert>);
        setAlert(alert);
        setTimeout(() => setAlert(), 3000);
        // dispatch(refreshProfile( ));
        // props.profile.token))
      } else {
        alert = (<Alert severity="error">Some error occurred while unfollowing question</Alert>);
        setAlert(alert);
        setTimeout(() => setAlert(), 3000);
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }

  function getQuestionData(){
    console.log('questionis',question);
    console.log('question id is',questionId);
    let id = questionId?questionId:question._id;
    axios.get(config.BASE_URL + '/qa/question?questionId=' + id, { headers: { 'Authorization': profile.token } }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setQuestion(response.data.data.question);
        setFollowers(response.data.data.question.followers);
        // state.questions = response.data.data.questions;
        // localStorage.setItem('questions', JSON.stringify(response.data.data.questions));
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));

  }
  useEffect(() => {
    getQuestionData();
    console.log('questionis', question)
     }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
        {alert}
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
              <div style={{ margin: "10px", display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                <IconButton style={{ marginTop: "-0.2em" }} aria-label="share">
                  <Link style={{
                    textDecoration: "none", color: "black",
                    fontSize: "15px",
                    "&:hover": {
                      color: "yellow",
                      borderBottom: "1px solid white",
                    },
                  }} onClick={()=>handleModalOpen(true)} >
                    <ModeEditIcon style={{ marginRight:4,fontSize: 20 }} />Answer Question
                  </Link>
                  {modalOpen && <BasicModalAnswer profile={profile} question={{ title: question.title, id: question._id }} handleModalOpen={handleModalOpen} handleAnswerAdded={handleAnswerAdded} modalOpen={modalOpen}/>}
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
              <QuestionAnswerIcon style={{ marginRight:4,fontSize: 20 }} />{question && question.answers && question.answers.length} Answers</Link>
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
              <FollowTheSignsIcon style={{ marginRight:4,fontSize: 20 }} />{followers} Followers</Link>
          </IconButton>
                {profile && profile.followedQuestions.includes(question._id) ? <>        <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },
            }} to="#" onClick={unfollowQuestion}>
              <BookmarkIcon style={{ marginRight:4,fontSize: 20 }} />Following</Link>
          </IconButton></>:<>        <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                
              },

            }} onClick={followQuestion}>
              <BookmarkTwoToneIcon style={{ fontSize: 20 }} />Follow</Link>
          </IconButton></>}
          
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                ><ExpandMoreIcon />
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
              <GridListTile > <RecipeReviewCard key={answer._id} answer={answer} profile={profile}/></GridListTile>
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