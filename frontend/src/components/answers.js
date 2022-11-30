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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.answer.createdBy.firstname+" "+ props.answer.createdBy.lastname}
        subheader={moment(props.answer.createdOn, config.DATE_FORMAT).fromNow() || ""}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
        You must be aware of the fact that admission to a university is based on the holistic approach i.e. your overall profile. Since you are aiming for the top-notch universities then certainly you need to have a super-strong profile and for that, you require the best scores in the academics as well as your GRE and TOEFL/IELTS exam along with strong recommendations, etc.

When it comes to the GRE, I would say, anything above 320 is considered as a good score. However, if you get 330+ then you’ll have a bit leverage in the other parameter of your profile.
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
    </Card>
  );
}