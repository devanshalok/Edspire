import React from "react";
import { Link } from 'react-router-dom';
import RecipeReviewCard from "../components/answers";
import {GridListTile} from "@material-ui/core";
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
    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}> 
        <Card style={{margin:"10px",marginTop:"40px"}} sx={{ maxWidth: 1000 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            DA
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Devansh Alok"
        subheader="September 14, 2016"
      />
    
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        What is the best GRE score to get into the top fifteen universities?
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Link to='/answer'> <ModeEditIcon/> </Link> <p style={{fontSize:"15px", marginTop:"15px"}}>Answer</p>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon /> <p style={{fontSize:"15px", marginTop:"15px"}}>Share</p>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
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
          <Item style={{marginTop:"30px"}}>
          <p style={{fontSize:"20px",marginTop:"10px",marginLeft:"20px"}}>Answers</p>
        <GridListTile > <RecipeReviewCard/></GridListTile>
        <GridListTile > <RecipeReviewCard/></GridListTile>
        <GridListTile > <RecipeReviewCard/></GridListTile>
        </Item>
        </Grid>
        <Grid item xs={3}>
      <p style={{marginTop:"20px",marginLeft:10,marginRight:20, fontSize:20}}>Related Questions</p><br></br>
          <Item style={{marginTop:"-5px",marginLeft:10,marginRight:20, fontSize:15}}>
           
            <p style={{marginLeft:20,marginTop:10}}>Is a 332 GRE score sufficient to get into the top 5 universities?</p><br></br>
            <p style={{marginLeft:20}}>How important is it to have high GRE scores when applying to grad school?</p><br></br>
            <p style={{marginLeft:20}}>What universities can someone with a score of 301 on the GRE get into?</p><br></br>
            <p style={{marginLeft:20}}>Will a GRE score of 295 give good colleges?</p><br></br>
            <p style={{marginLeft:20}}>What is the best GRE score to get into the top fifteen universities?</p><br></br>
          </Item>
        </Grid>
    
    </Grid>
    </Box>
  );
}
export default Answer;