import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../config";
import { Box, Modal } from "@mui/material";
import CollegeFinderForm from "../components/collegefinderform";
function CollegeFinder() {
  const [universities, setUniversities] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const profile = useSelector(state => {
    if (state.userSlice.profile) {
      console.log('state is ', state.userSlice)
      return state.userSlice.profile
    } return undefined
  });
  function handleCollegeSubmit(){

  }
  function getUniversities(){
    axios.get(config.BASE_URL + '/find-colleges', {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setUniversities(response.data.data.colleges);
        // setSpaces(response.data.data.spaces);
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  React.useEffect(() => {
    if(universities.length==0){
      getUniversities();
    }
  }, [])

  function followUniversity(e) {
    console.log(e.target.id);
    axios.post(config.BASE_URL + '/follow-university', { university: e.target.id }, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        // setSpaces(response.data.data);
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  return (
    <>
    {!profile.greScore && navigate('/profile')}
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px", marginTop: "20px" }}> These are the top universities based on your credentials</p>
      <p style={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}>Want to find more universities based on different filters?<Button onClick={handleOpen}>Click here</Button></p>
      <div style={{ maxWidth: "100%", margin: "30px", display: "flex", flexWrap: "wrap" }}>
        <CollegeFinderForm handleClose={handleClose} handleOpen={handleOpen} open={open} handleSubmit={handleCollegeSubmit} token={profile.token} setUniversities={setUniversities}/>
        {universities.map((data) => (
          <Card style={{ marginLeft: 125, marginTop: 20 }} sx={{ maxWidth: 500 }}>
            <>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={data.image || "https://images.unsplash.com/photo-1622397333309-3056849bc70b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFydmFyZCUyMHVuaXZlcnNpdHl8ZW58MHx8MHx8&w=1000&q=80"} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.descr}
                </Typography>
              </CardContent>
              <CardActions style={{ marginTop: 10, display: "flex", flexDirection: "row", width: "100%" }}>
                <Button size="small"><InfoIcon />About the University</Button>
                <Button size="small" id={data.name} onClick={followUniversity}><FavoriteIcon />Follow University</Button>
              </CardActions></>

          </Card>
        ))}
      </div>
    </>
  );
}
export default CollegeFinder;