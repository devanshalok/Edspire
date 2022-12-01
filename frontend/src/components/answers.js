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
import CommentIcon from '@mui/icons-material/Comment';
import { blue } from '@material-ui/core/colors';
import moment from 'moment';
import config from '../config';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log('props are',props)

  return (
    <Card style={{margin:"10px"}} sx={{ maxWidth: 1000 }}>
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
        title={props.answer.createdBy.firstname+" "+ props.answer.createdBy.lastname}
        subheader={moment(props.answer.createdOn, config.DATE_FORMAT).fromNow() || ""}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {props.answer.answer}
       </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <div style={{ margin:"10px",display: "flex", flexDirection: "row",justifyContent: "space-between", width: "100%" }}>
        <IconButton aria-label="add to favorites">
           <ThumbUpIcon style={{fontSize:25}}/> <p style={{fontSize:"20px",marginLeft:5, marginTop:"15px"}}>Upvote</p>
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon style={{marginLeft:20,fontSize:25}}/> <p style={{fontSize:"20px", marginTop:"15px",marginLeft:5}}>Comment</p>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon style={{marginLeft:20,fontSize:25}}/> <p style={{fontSize:"20px", marginTop:"15px",marginLeft:5}}>Share</p>
        </IconButton>
        </div>
      </CardActions>
    
    </Card>
  );
}