import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Box, Grid } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import RecipeReviewCard from "../components/card";
import "../App.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { palette } from '@mui/system';

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
    <Card style={{height:"1500px"}}sx={{ maxWidth: "100%" }}>   
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
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <div style={{display:"flex",flexDirection:"column",border:"1px solid black", padding:20,marginLeft:"-9em"}}>
                            <h4>Requirements for the college</h4>
                    <List>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary="Minimum IELTS Score" secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline',color: "success.main" }}
                component="span"
                variant="body2"
              >
                {collegeMain.minIelts}
              </Typography>
            </React.Fragment>} >
                </ListItemText>
                            </ListItem>
                            <Divider component="li" />

                            <ListItem alignItems="flex-start">
                        <ListItemText primary="Minimum GRE Score" secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline',color: "success.main" }}
                component="span"
                variant="body2"
              >
                {collegeMain.minGre}
              </Typography>
            </React.Fragment>} >
                </ListItemText>
                            </ListItem>
                            <Divider component="li" />

                            <ListItem alignItems="flex-start">
                        <ListItemText primary="Minimum Percentage" secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline',color: "success.main" }}
                component="span"
                variant="body2"
              >
                {collegeMain.minPercent}
              </Typography>
            </React.Fragment>} >
                </ListItemText>
                            </ListItem>
                            <Divider component="li" />

                            <ListItem alignItems="flex-start">
                        <ListItemText primary="Minimum Work Experience" secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline',color: "success.main" }}
                component="span"
                variant="body2"
              >
                {collegeMain.workExperienceYears}
              </Typography>
            </React.Fragment>} >
                </ListItemText>
                            </ListItem>
                            <Divider component="li" />

                            <ListItem alignItems="flex-start">
                        <ListItemText primary="Backlogs Allowed" secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline',color: "success.main" }}
                component="span"
                variant="body2"
              >
                {collegeMain.backlogs}
              </Typography>
            </React.Fragment>} >
                </ListItemText>
                            </ListItem>
                            <Divider component="li" />

                            <ListItem alignItems="flex-start">
                        <ListItemText primary="Fees per Semester" secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline',color: "success.main" }}
                component="span"
                variant="body2"
              >
                {collegeMain.feePerSem}
              </Typography>
            </React.Fragment>} >
                </ListItemText>
                            </ListItem>
                            <Divider component="li" />



                    </List>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",marginLeft:200}}>
                        <h4>Under Graduate Courses</h4>
                        
                    {collegeMain.undergraduateCourses && collegeMain.undergraduateCourses.map(undergraduateCourse =>  <div style={{display:"flex",flexDirection:"column",marginBottom:10}}> <p style={{marginLeft:10}}>{undergraduateCourse && undergraduateCourse.name}</p></div>)}<br/>
                    <h4>Graduate Courses</h4>
                    {collegeMain.graduateCourses && collegeMain.graduateCourses.map(graduateCourse =>  <div style={{display:"flex",flexDirection:"column",marginBottom:10}}> <p style={{marginLeft:10}}>{graduateCourse && graduateCourse.name}</p></div>)}
                    </div>
                    </div>





                    </div>
                    
                    </div>     
                </CardContent>
                <CardActions style={{marginTop:10,display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                </CardActions></>
    </Card>
  );
}