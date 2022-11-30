import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ImgMediaCard from "../components/collegecard";

function CollegeFinder() {
  return (
    <>
    <p style={{textAlign:"center",fontWeight:"bold",fontSize:"30px",marginTop:"20px"}}> Colleges based on your score</p>
    <p style={{textAlign:"center",fontSize:"20px",marginTop:"20px"}}>Want to find more colleges based on your what if score? <Link to='/collegefinderform'>Click here</Link></p>
      <ImgMediaCard />
    </>
  );
}
export default CollegeFinder;