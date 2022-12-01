import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import config from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 680,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [spaces, setSpaces] = React.useState([]);
  const [space, setSpace] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [descr, setDescr] = React.useState("");
  let token = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      console.log('useselector state is ', state.userSlice)
      return state.userSlice.profile.token
    } return undefined
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(getAllQuestions());
function handleSubmit(){
  
  let data = {title,descr,space:spaces.filter(sspace=>sspace.name==space).map(space=>space._id)[0]};
  console.log('data is',data)
  axios.post(config.BASE_URL + '/qa/question',data, {
    headers: {
      'Authorization': token
    }
  }).then(response => {
    if (response.status == 200 && response.data.statusCode == 200) {
      console.log('data',response.data);
      setSpaces(response.data.data.spaces);
      handleClose();
    } else {
      console.log('some exception occurred', response)
    }
  }).catch(error => console.log('some exception occurred', error));
};


  React.useEffect(() => {
    axios.get(config.BASE_URL + '/spaces', {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      if (response.status == 200 && response.data.statusCode == 200) {
        console.log('data',response.data);
        setSpaces(response.data.data.spaces);
      } else {
        console.log('some exception occurred', response)
      }
    }).catch(error => console.log('some exception occurred', error));
  }, []);

  return (
    <div>
      <Button style={{ textDecoration: "none", color: "white", height: 30, width: 140, "&:hover": { color: "black" }, }} onClick={handleOpen}>Ask a question</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 style={{ textAlign: "center" }}> Add a Question</h2>
          <p style={{ fontWeight: "bold", marginTop: 10, marginBottom: -1 }}>Tips on getting good answers quickly:</p>
          <ul>
            <li>Make sure your question has not been asked already</li>
            <li>Keep your question short and to the point</li>
            <li>Double-check grammar and spelling</li>
          </ul><br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Space</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={space}
              onChange={(e)=>setSpace(e.target.value)}
            >
              {spaces && spaces.map((space)=>(<MenuItem value={space.name}>{space.name}</MenuItem>))}
              {/* <MenuItem value={10}>GRE</MenuItem>
              <MenuItem value={20}>TOEFL</MenuItem>
              <MenuItem value={30}>College</MenuItem> */}
            </Select>
          </FormControl>

          <form >
            <div className="form-group">
              <label style={{ marginBottom: "10px", marginTop: "15px" }} htmlFor="name">Title</label>
              <input className="form-control" id="name" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "10px", marginTop: "15px" }} htmlFor="name">Detailed Description</label>
              <textarea style={{ height: 200 }} className="form-control" id="name" value={descr} onChange={(e)=>setDescr(e.target.value)}/>
            </div>
            <div className="form-group">
              <button style={{ marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
              <button style={{ backgroundColor: "red", marginRight: "10px", marginTop: "20px", width: "80px", float: "right" }} onClick={(e) => setOpen(false)} className="form-control btn btn-primary close" >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}