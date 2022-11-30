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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));


function HomeFeed() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={3}>
      <p style={{fontWeight:"bold",marginTop:"20px",marginLeft:10, fontSize:20}}>Questions</p><br></br>
          <Item style={{marginTop:"-5px",marginLeft:10, fontSize:15}}>
           
            <p style={{marginLeft:20,marginTop:10}}>Questions for you</p><br></br>
            <p style={{marginLeft:20}}>Answer requests</p><br></br>
            <p style={{marginLeft:20}}>Answers given</p><br></br>
          </Item>
        </Grid>
        <Grid item xs={6}> <p style={{marginTop:"20px", fontSize:20}}><StarIcon style={{marginLeft:20}}/>Questions for you</p>
          <Item style={{marginTop:"30px"}}><ImageListItem > <RecipeReviewCard/></ImageListItem>
        <ImageListItem > <RecipeReviewCard/></ImageListItem>
        <ImageListItem > <RecipeReviewCard/></ImageListItem></Item>
        </Grid>
        <Grid item xs={3}>
      <p style={{marginTop:"20px",marginLeft:10, fontSize:20}}>Topics You Know About</p><br></br>
          <Item style={{marginTop:"-5px",marginLeft:10, fontSize:15}}>
           
            <p style={{marginLeft:20,marginTop:10}}>Housing In USA</p><br></br>
            <p style={{marginLeft:20}}>GRE help</p><br></br>
            <p style={{marginLeft:20}}>Scholarship Help</p><br></br>
          </Item>
        </Grid>
    
    </Grid>
    </Box>
  );
}
export default HomeFeed;