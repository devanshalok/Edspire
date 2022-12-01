import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Link } from 'react-router-dom';
import moment from 'moment'
import config from '../config';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BasicModalAnswer from './basicmodalanswer';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { refreshProfile } from '../redux/userSlice';
import getProfile from '../utils';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
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

export default function RecipeReviewCard(props) {
  console.log('props', props);
  const dispatch = useDispatch();
  const [followers,setFollowers] = React.useState(props.question.followers || 0);
  function followQuestion() {
    let data = { questionId: props.question._id }
    axios.post(config.BASE_URL + '/follow-question', data, {
      headers: {
        'Authorization': props.profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data', response.data);
        // setSpaces(response.data.data.spaces);
        // handleClose();
        getProfile(props.profile.token).then(response => {
          console.log('response', response);
          dispatch(refreshProfile(response));
        })
        setFollowers(followers+1);
        // dispatch(refreshProfile( ));
        // props.profile.token))
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }

  function unfollowQuestion() {
    let data = { questionId: props.question._id }
    axios.post(config.BASE_URL + '/unfollow-question', data, {
      headers: {
        'Authorization': props.profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data', response.data);
        // setSpaces(response.data.data.spaces);
        // handleClose();
        getProfile(props.profile.token).then(response => {
          console.log('response', response);
          dispatch(refreshProfile(response));
          setFollowers(followers-1);
        })
        // dispatch(refreshProfile( ));
        // props.profile.token))
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  return (
    <Card style={{ margin: "10px" }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.question.createdBy.firstname[0] + props.question.createdBy.lastname[0]}
          </Avatar>
        }
        title={props.question.createdBy.firstname + " " + props.question.createdBy.lastname}
        subheader={moment(props.question.modifiedOn, config.DATE_FORMAT).fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary" style={{ fontSize: "20px" }}>
          {props.question.title}
        </Typography>
      </CardContent>
      <CardActions >
        <div style={{ margin: "10px",marginLeft:"20px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          <IconButton aria-label="add to favorites">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px", marginTop: 12,
            }} state={props.question._id} to='/answer'>
              <OpenInNewIcon style={{ fontSize: 20 }} /> Go to question</Link>
          </IconButton>
          <IconButton aria-label="share">
            <BasicModalAnswer />
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
              <QuestionAnswerIcon style={{ fontSize: 20 }} />{props.question.answers.length} Answers</Link>
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
              <FollowTheSignsIcon style={{ fontSize: 20 }} />{followers} Followers</Link>
          </IconButton>
          {props.profile && props.profile.followedQuestions.includes(props.question._id) ? <>        <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },
            }} to="#" onClick={unfollowQuestion}>
              <BookmarkIcon style={{ fontSize: 20 }} />Following</Link>
          </IconButton></> : <>        <IconButton aria-label="share">
            <Link style={{
              textDecoration: "none", color: "black",
              fontSize: "15px",
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },

            }} onClick={followQuestion}>
              <BookmarkTwoToneIcon style={{ fontSize: 20 }} />Follow</Link>
          </IconButton></>}

        </div>
      </CardActions>
    </Card>
  );
}