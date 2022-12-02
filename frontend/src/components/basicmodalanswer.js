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
import axios from 'axios';
import config from '../config';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModalAnswer({ profile, question,handleModalOpen,modalOpen,handleAnswerAdded }) {
  console.log('handleModalopen ',handleModalOpen)
  // const [open, setOpen]= React.useState(false);
  const handleOpen = () => handleModalOpen(true);
  const handleClose = () => handleModalOpen(false);
  const [answer, setAnswer] = React.useState('');
  const [alert, setAlert] = React.useState("");

  console.log('profile is ', profile);
  console.log('question is ', question);
  const handleSubmit = () => {

    let data = { questionId: question.id, answer };
    console.log('data is', data)
    axios.post(config.BASE_URL + '/qa/answer', data, {
      headers: {
        'Authorization': profile.token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data', response.data);
        let alert = (<Alert severity="success">Answer Added Successfully!</Alert>);
        setAlert(alert);
        // setSpaces(response.data.data.spaces);
        setTimeout(() => { setAlert();handleAnswerAdded(false); }, 2000)
      } else {
        let alert = (<Alert severity="error">Some error occurred whiile adding Answer!</Alert>);
        setAlert(alert);
        // setSpaces(response.data.data.spaces);
        setTimeout(() => { setAlert()}, 2000)
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  };

  return (
    <div>


      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                  {alert}
          <h2 style={{ textAlign: "center" }}>Add Answer </h2>

          <CardHeader style={{ marginLeft: "-1.2em" }}
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
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={profile && profile.firstName + " " + profile.lastName}
          // subheader={moment(props.question.modifiedOn,config.DATE_FORMAT).fromNow()}
          />
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>{question && question.title}</p>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="form-group">
              <label style={{ marginBottom: "10px", fontSize: "18px" }} htmlFor="name">Your Answer</label>
              <textarea style={{ height: 200, border: "none", fontSize: "18px" }} className="form-control" id="name" value={answer} on onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <div style={{ borderTop: "1px solid gray" }} className="form-group">
              <button style={{ marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
              <button style={{ backgroundColor: "red", marginRight: "10px", marginTop: "20px", width: "80px", float: "right" }} onClick={handleClose} className="form-control btn btn-primary close" >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}