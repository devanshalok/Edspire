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

import axios from 'axios';
import { getAllQuestions } from "../redux/questionSlice";
import config from "../config";

export default function Space() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  // dispatch(getAllQuestions());

  let token = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile.token
    } return undefined
  })
    useEffect(() => {
        axios.get(config.BASE_URL + '/qa/questions', { headers: { 'Authorization': token } }).then(response => {
          if (response.status == 200 && response.data.statusCode == 200) {
            console.log(response.data);
            setQuestions(response.data.data.questions)
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
                img src="https://www.usnews.com/dims4/USNEWS/95badee/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F82%2F7bbabaea5b47be61379d37af47e531%2FHowardUniversity-FoundersLibrary.jpg"
                />
                <CardContent>
                   <div style={{marginTop:"40px",marginLeft:"40px",display:"grid", gridTemplateColumns:"1fr 2fr 1fr"}}>
                    <div style={{display:"flex",flexDirection:"column",width:"200px", 
   maxWidth:"200px",display: "inline-block"}}>
    
                    <Avatar style={{marginLeft:10,height:"150px",width:"150px"}} src="https://www.usnews.com/dims4/USNEWS/95badee/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F82%2F7bbabaea5b47be61379d37af47e531%2FHowardUniversity-FoundersLibrary.jpg"></Avatar>
                    <Typography style={{marginTop:20,marginLeft:40}} gutterBottom variant="h4" component="div">
                        Hello
                    </Typography>
                    <Typography  variant="body2" color="text.secondary">
                    here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text
                    </Typography>
                    </div>
                    
                    <div style={{display:"flex",flexDirection:"column"}}>
                    
                   <h4 style={{marginLeft:200,marginBottom:20,fontWeight:"bold"}}>Questions from this space</h4>
                    {questions.map(question =>  <RecipeReviewCard key={question._id} question={question} />)}
                    
                    </div>
                    
                    <div style={{marginLeft:90,display:"flex",flexDirection:"column",}}>
                    <h4 style={{fontWeight:"bold",marginBottom:20}}>Contributors</h4>
                    <Typography gutterBottom variant="h6" component="div">
                       
                       <div style={{display:"flex",flexDirection:"row",marginBottom:10}}><Avatar style={{marginLeft:10,}} >A</Avatar> <p style={{marginLeft:10}}>hello</p></div>
                       <div style={{display:"flex",flexDirection:"row",marginBottom:10}}><Avatar style={{marginLeft:10,}} >B</Avatar> <p style={{marginLeft:10}}>hello</p></div>
                       <div style={{display:"flex",flexDirection:"row",marginBottom:10}}><Avatar style={{marginLeft:10,}} >C</Avatar> <p style={{marginLeft:10}}>hello</p></div>
                       <div style={{display:"flex",flexDirection:"row",marginBottom:10}}><Avatar style={{marginLeft:10,}} >D</Avatar> <p style={{marginLeft:10}}>hello</p></div>
                    
                    </Typography>
                    </div>
                    </div>
                    
                     
                </CardContent>
                <CardActions style={{marginTop:10,display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                </CardActions></>
      
    </Card>
  );
}