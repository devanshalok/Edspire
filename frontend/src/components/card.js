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
  console.log('props', props)
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
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.question.createdBy.firstname + " " + props.question.createdBy.lastname}
        subheader={moment(props.question.modifiedOn, config.DATE_FORMAT).fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary" style={{ fontSize: "20px" }}>
          {props.question.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div style={{ margin: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
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
              <FollowTheSignsIcon style={{ fontSize: 20 }} />{props.question && props.question.followers} Followers</Link>
          </IconButton>
          {props.profile && props.profile.followedQuestions.includes(props.question._id) ? <>        <IconButton aria-label="share">
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

        </div>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > */}
        {/* <ExpandMoreIcon /> */}
        {/* </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}