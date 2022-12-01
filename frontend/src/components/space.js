import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Box, Grid } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import RecipeReviewCard from "../components/card";
import "../App.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import config from "../config";

export default function Space(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const space= location.state
  console.log('space', space)
  const [spaceMain, setSpaceMain] = useState([]);
  // dispatch(getAllQuestions());

  let profile = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  })
    useEffect(() => {
        axios.get(config.BASE_URL + '/qa/questions-for-space?space='+space, { headers: { 'Authorization': profile.token } }).then(response => {
          if (response.status == 200 && response.data.statusCode == 200) {
            console.log(response.data);
            
            setSpaceMain(response.data.data[0])
            console.log('spaceMain', spaceMain)
            
            // state.questions = response.data.data.questions;
            // localStorage.setItem('questions', JSON.stringify(response.data.data.questions));
          } else {
            console.log('some exception occurred', response)
          }
        }).catch(error => console.log('some exception occurred', error));
      }, [])
  return (
    <Card style={{height:"800px"}}sx={{ maxWidth: "100%" }}>   
      <>
      <CardMedia
                component="img"
                alt="green iguana"
                height="200" 
                img src={spaceMain.backgroundImageUrl}
                />
                <CardContent>
                   <div style={{marginTop:"40px",marginLeft:"40px",display:"grid", gridTemplateColumns:"1fr 2fr 1fr"}}>
                    <div style={{display:"flex",flexDirection:"column",width:"200px", 
   maxWidth:"200px",display: "inline-block"}}>
    
                    <Avatar style={{marginLeft:10,height:"150px",width:"150px"}} src={spaceMain.headerImageUrl}></Avatar>
                    <Typography style={{marginTop:20,marginLeft:40}} gutterBottom variant="h4" component="div">
                        {spaceMain.name}
                    </Typography>
                    <Typography  variant="body2" color="text.secondary">
                    {spaceMain.description}
                    </Typography>
                    </div>
                    
                    <div style={{display:"flex",flexDirection:"column"}}>
                    
                   <h4 style={{marginLeft:200,marginBottom:20,fontWeight:"bold"}}>Questions from {spaceMain.name} space</h4>
                    {spaceMain.questions && spaceMain.questions.map(question =>  <RecipeReviewCard key={question._id} question={question} profile={profile}/>)}
                    
                    </div>
                    
                    <div style={{marginLeft:90,display:"flex",flexDirection:"column",}}>
                    <h4 style={{fontWeight:"bold",marginBottom:20}}>Followers</h4>
                    <Typography gutterBottom variant="h6" component="div">
                       
                    {spaceMain.followers && spaceMain.followers.map(follower =>  <div style={{display:"flex",flexDirection:"row",marginBottom:10}}><Avatar style={{marginLeft:10,}} >{follower && follower.firstName[0] + follower.lastName[0]}</Avatar> <p style={{marginLeft:10}}>{follower && follower.firstName +" "+ follower.lastName}</p></div>)}
                    </Typography>
                    </div>
                    </div>
                    
                     
                </CardContent>
                <CardActions style={{marginTop:10,display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                </CardActions></>
      
    </Card>
  );
}