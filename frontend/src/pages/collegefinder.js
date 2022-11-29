import { Typography } from "@material-ui/core";
import ImgMediaCard from "../components/collegecard";

function CollegeFinder() {
  return (
    <>
    <p style={{textAlign:"center",fontWeight:"bold",fontSize:"30px",marginTop:"20px"}}> Colleges based on your score</p>
      <ImgMediaCard />
    </>
  );
}
export default CollegeFinder;