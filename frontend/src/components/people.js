// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dataList from "../components/data.json"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Avatar } from '@material-ui/core';
import TwitterIcon from '@mui/icons-material/Twitter';
function People() {
  // TODO FIX THE DESCRIPTION SIZE, SO THAT DISPLAY IS PREDICTABLE
  const [people, setpeople] = useState([]);
  const profile = useSelector(state => {
    if (state.userSlice.profile) {
      console.log('state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  });
  useEffect(() => {
    axios.get(config.BASE_URL + '/users', {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('fuck',response.data);
        setpeople(response.data.data.users);
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, [])
  return (
    <div style={{ maxWidth: "100%", marginLeft: "130px", display: "flex", flexWrap: "wrap" }}>
      {/* TODO ADD EXPLORE SPACES HEADING HERE */}
      {people && people.map((peoples) => (
        <Card style={{ marginLeft: 40, marginTop: 50, width: 350, boxShadow: "10px 5px 5px gray" }} sx={{ maxWidth: 500 }}>
          <>
            <Avatar style={{marginLeft:"95px",marginTop:20,width:150,height:150,fontSize:"60px"}}>{peoples.firstName[0]}{peoples.lastName[0]}</Avatar>
            <CardContent style={{height:150}}>
              <Typography style={{textAlign:"center"}} gutterBottom variant="h5" component="div">
                {peoples.firstName +" "+peoples.lastName}
              </Typography>
              <Typography style={{textAlign:"center"}} variant="body2" color="h5.secondary">
                {peoples.university}<br/>
                {peoples.branch}<br/>
                {peoples.city}, {peoples.state}
              </Typography>
            </CardContent>
            <CardActions style={{marginTop:10,display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Button size="small"><MailIcon/><a style={{textDecoration:"none"}} href={"mailto:"+peoples.emailId} target="_blank">Mail</a></Button>
                    <Button size="small"><LinkedInIcon/><a style={{textDecoration:"none"}} href={peoples.linkedIn} target="_blank">LinkedIn</a></Button>
                    <Button size="small"><TwitterIcon/><a style={{textDecoration:"none"}} href={peoples.twitter} target="_blank">Twitter</a></Button>
                </CardActions></>
      

        </Card>
      ))}
    </div>);
}
export default People;


