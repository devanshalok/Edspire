import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import { Avatar } from '@material-ui/core';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 520,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModalAnswer() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      
       <Link style={{
            textDecoration: "none", color: "black",
            fontSize: "15px",
            "&:hover": {
              color: "yellow",
              borderBottom: "1px solid white",
            },
          }} onClick={handleOpen} >
             <ModeEditIcon  style={{ fontSize: 20}}  />Answer Question
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2 style={{textAlign:"center"}}>Answer </h2>
        
      <CardHeader style={{marginLeft:"-1.2em"}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            AM
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        titleTypographyProps={{variant:'subtitle1'}}
        title ="Abul mohaimin"
        // subheader={moment(props.question.modifiedOn,config.DATE_FORMAT).fromNow()}
      />
      <p style={{fontSize:"25px",fontWeight:"bold"}}>What is the minimum score to get into SJSU?</p>
    <form >
          <div className="form-group">
              <label style={{ marginBottom: "10px",fontSize:"18px" }} htmlFor="name">Your Answer</label>
              <textarea style={{height:200,border:"none",fontSize:"18px"}}className="form-control" id="name" />
          </div>
          <div style={{borderTop:"1px solid gray"}}className="form-group">
              <button style={{ marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary" type="submit">
                  Submit
              </button>
              <button style={{ backgroundColor:"red",marginRight: "10px", marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary close" >
                  Cancel
              </button>
          </div>
      </form>
        </Box>
      </Modal>
    </div>
  );
}