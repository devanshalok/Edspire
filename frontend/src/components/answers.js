import * as React from 'react';
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
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { blue } from '@material-ui/core/colors';
import moment from 'moment';
import config from '../config';
import axios from 'axios';
import getProfile from '../utils';
import { refreshProfile } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

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
  const [expanded, setExpanded] = React.useState(false);
  const [upVotes, setUpVotes] = React.useState(props.answer.upVotes || 0);
  const [downVotes, setDownVotes] = React.useState(props.answer.downVotes || 0);
  const [isUpVoted,setIsUpVoted] = React.useState(props.profile.upVotes && props.profile.upVotes.includes(props.answer._id)?true:false);
  const [isDownVoted,setIsDownVoted] = React.useState(props.profile.downVotes && props.profile.downVotes.includes(props.answer._id)?true:false);
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log('props are', props)

  function upVoteFn() {
    // let data = { questionId }
    // console.log('data is',data,questionId);
    let num = isUpVoted?-1:1;
    // let isDownVotedTrue = isDownVoted;
    axios.get(config.BASE_URL + '/qa/upvote?answerId='+props.answer._id+"&num="+num+"&isDownVoted="+isDownVoted, {
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
        setUpVotes(upVotes+num);
        setIsUpVoted(!isUpVoted);
        if(isDownVoted){
          setIsDownVoted(false);
          setDownVotes(downVotes-1);
        }
        // dispatch(refreshProfile( ));
        // props.profile.token))
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }

  function downVoteFn() {
    let num = isDownVoted?-1:1;
    axios.get(config.BASE_URL + '/qa/downvote?answerId='+props.answer._id+"&num="+num+"&isUpVoted="+isUpVoted, {
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
        setDownVotes(downVotes+num);
        setIsDownVoted(!isDownVoted);
        if(isUpVoted){
          setIsUpVoted(false);
          setUpVotes(upVotes-1);
        }
        // dispatch(refreshProfile( ));
        // props.profile.token))
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  return (
    <Card style={{ margin: "10px" }} sx={{ maxWidth: 1000 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {props.answer.createdBy.firstname[0] + props.answer.createdBy.lastname[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.answer.createdBy.firstname + " " + props.answer.createdBy.lastname}
        subheader={moment(props.answer.createdOn, config.DATE_FORMAT).fromNow() || ""}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {props.answer.answer}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div style={{ margin: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <IconButton aria-label="add to favorites" onClick={upVoteFn}>
            {isUpVoted? <><ThumbUpIcon style={{ fontSize: 25 }} /> <p style={{ fontSize: "20px", marginLeft: 5, marginTop: "15px" }}>{upVotes}</p></> : <><ThumbUpOutlinedIcon style={{ fontSize: 25 }} /> <p style={{ fontSize: "20px", marginLeft: 5, marginTop: "15px" }}>{upVotes}</p></>}
          </IconButton>
          <IconButton aria-label="share" onClick={downVoteFn}>
          {isDownVoted? <><ThumbDownIcon style={{ fontSize: 25 }} /> <p style={{ fontSize: "20px", marginLeft: 5, marginTop: "15px" }}>{downVotes}</p></> : <><ThumbDownOutlinedIcon style={{ fontSize: 25 }} /> <p style={{ fontSize: "20px", marginLeft: 5, marginTop: "15px" }}>{downVotes}</p></>}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon style={{ marginLeft: 20, fontSize: 25 }} /> <p style={{ fontSize: "20px", marginTop: "15px", marginLeft: 5 }}>Share</p>
          </IconButton>
        </div>
      </CardActions>

    </Card>
  );
}