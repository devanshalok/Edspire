import {
  Typography,
  Button,
} from "@material-ui/core";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import config from "../config";
export default function CollegeFinderForm({ open, handleOpen, handleClose, token,setUniversities}) {

  const [greScore, setGreScore] = React.useState(320);
  const [ieltsScore, setIeltsScore] = React.useState(7.5);
  const [underGradPercent, setUnderGradPercent] = React.useState(70.0);
  const [backlogs, setBacklogs] = React.useState(0);
  const [workExperienceYears, setWorkExperienceYears] = React.useState(4);
  const [branch, setBranch] = React.useState('Select a Branch');
  const [branches, setBranches] = React.useState([]);

  React.useEffect(() => {
    axios.get(config.BASE_URL + '/branches', {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setBranches(response.data.data.branches)
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, []);

  function handleSubmit(e){
    e.preventDefault();
    let data = {greScore,ieltsScore,underGradPercent,backlogs,workExperienceYears,branch};
    axios.post(config.BASE_URL + '/find-colleges-with-params',data, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log(response.data);
        setUniversities(response.data.data.colleges);
        handleClose();
        // setBranches(response.data.data.branches)
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          // height:1000,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{ marginTop: 50, fontFamily: "sans-serif", textAlign: "center" }}>
              <Typography style={{ marginBottom: 20 }} variant="h5">Enter your expected scores</Typography>
              <form>
                <TextField
                  style={{ width: "400px", margin: "5px" }}
                  type="number"
                  label="Expected GRE Score"
                  variant="outlined"
                  value={greScore}
                  onChange={(e) => setGreScore(e.target.value)}
                />
                <br />
                <TextField
                  style={{ width: "400px", margin: "5px" }}
                  type="number"
                  label="Expected IELTS Score"
                  variant="outlined"
                  value={ieltsScore}

                  onChange={(e) => setIeltsScore(e.target.value)}
                />
                <br />
                <TextField
                  style={{ width: "400px", margin: "5px" }}
                  type="number"
                  label="Expected Percentage"
                  variant="outlined"
                  value={underGradPercent}
                  onChange={(e) => setUnderGradPercent(e.target.value)}
                />
                <br />
                <TextField
                  style={{ width: "400px", margin: "5px" }}
                  type="number"
                  label="Backlogs"
                  variant="outlined"
                  value={backlogs}
                  onChange={(e) => setBacklogs(e.target.value)}
                />
                <br />
                <TextField
                  style={{ width: "400px", margin: "5px" }}
                  type="number"
                  label="Work experience"
                  variant="outlined"
                  value={workExperienceYears}
                  onChange={(e) => setWorkExperienceYears(e.target.value)}
                />
                <br />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={branch}
                  label="Age"
                  style={{ width: "400px", margin: "5px" }}
                  variant="outlined"
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <MenuItem value={'Select a Branch'}>Select a Branch</MenuItem>
                  {branches.map(brancho => <MenuItem value={brancho.name}>{brancho.name}</MenuItem>)}

                </Select>
                <br />
                <Button style={{ marginTop: 15 }} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                  {/* <Link style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "20px",
                    "&:hover": {
                      color: "yellow",
                      borderBottom: "1px solid white",
                    },
                  }} to="/collegefinder">Search</Link> */}
                  Search
                </Button>
              </form>
            </div>
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        </Box>
      </Modal>
    </div>

  );
}
