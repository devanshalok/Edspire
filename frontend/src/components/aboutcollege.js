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

export default function AboutCollege(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data= location.state
  console.log('data', data)
  const [collegeMain, setcollegeMain] = useState({});
  // dispatch(getAllQuestions());

  let profile = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  })
    useEffect(() => {
        axios.get(config.BASE_URL + '/university?name='+data, { headers: { 'Authorization': profile.token } }).then(response => {
          if (response.status == 200 && response.data.statusCode == 200) {
            console.log('hello',response.data);
            
            setcollegeMain(response.data.data.university[0])
            console.log('helloa',response.data.data.university[0])
            console.log('collegeMain', collegeMain)
            console.log('collegeMainPublic', collegeMain.country)
            console.log('collegeMainheader', collegeMain.minIelts)
            
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
                img src={collegeMain.backgroundImageUrl}
                />
                <CardContent>
                   <div style={{marginTop:"40px",marginLeft:"40px",display:"grid", gridTemplateColumns:"1fr 2fr"}}>
                    <div style={{display:"flex",flexDirection:"column",width:"200px", 
   maxWidth:"200px",display: "inline-block"}}>
    
                    <Avatar style={{height:"150px",width:"150px"}} src={collegeMain.headerImageUrl}></Avatar>
                    <Typography style={{marginTop:15,marginLeft:15}} gutterBottom variant="h5" component="div">
                        {collegeMain.name}
                    </Typography>
                    <Typography  variant="body2" color="text.secondary">
                    {collegeMain.descr}<br/><br/>
                    {collegeMain.street}, {collegeMain.city}, {collegeMain.state}, {collegeMain.country}
                    </Typography>
                    </div>
                    
                    <div style={{display:"flex",flexDirection:"column"}}>
                    
                   <h4 style={{marginLeft:200,marginBottom:20,fontWeight:"bold"}}>About {collegeMain.name} </h4>
                    <h4>Fees Per Semester:{collegeMain.feePerSem}</h4>
                    <h4>Minimum GRE required:{collegeMain.minGre}</h4>
                    <h4>Minimum IELTS required:{collegeMain.minIelts}</h4>
                    <h4>Minimum Percentage required:{collegeMain.minPercent}</h4>
                    <h4>Minimum Work Experience required:{collegeMain.workExperienceYears}</h4>
                    <h4>Number of backlogs allowed:{collegeMain.backlogs}</h4>
                    




                    </div>
                    
                    </div>     
                </CardContent>
                <CardActions style={{marginTop:10,display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                </CardActions></>
    </Card>
  );
}