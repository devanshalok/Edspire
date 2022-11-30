import {
  Typography,
  Button,
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import * as React from "react";
import { Link } from "react-router-dom";
export default function CollegeFinderForm() {
  return (
    <div style={{marginTop:50,fontFamily:"sans-serif",textAlign:"center"}}>

      <Typography style={{marginBottom:20}} variant="h5">Enter your expected scores</Typography>
      <form>
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Expected GRE Score"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Expected TOEFL Score"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Expected GPA"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="number"
          label="Backlogs"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="number"
          label="Work experience"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Desired Course"
          variant="outlined"
        />
        <br />
        <Button style={{marginTop:15}} variant="contained" color="primary">
        <Link style={{ textDecoration: "none",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },}}to="/collegefinder">Search</Link>
        </Button>
      </form>
    </div>
  );
}
