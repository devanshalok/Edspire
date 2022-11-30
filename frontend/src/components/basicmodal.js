import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Ask a question</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2 style={{textAlign:"center"}}> Add a Question</h2>
        <p style={{fontWeight:"bold",marginTop:10,marginBottom:-1}}>Tips on getting good answers quickly:</p>
        <ul>
        <li>Make sure your question has not been asked already</li>
        <li>Keep your question short and to the point</li>
        <li>Double-check grammar and spelling</li>
       </ul><br/>
<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Space</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>GRE</MenuItem>
          <MenuItem value={20}>TOEFL</MenuItem>
          <MenuItem value={30}>College</MenuItem>
        </Select>
      </FormControl>    

    <form >
          <div className="form-group">
              <label style={{ marginBottom: "10px",marginTop:"15px" }} htmlFor="name">Title</label>
              <input className="form-control" id="name" />
          </div>
          <div className="form-group">
              <label style={{ marginBottom: "10px", marginTop: "15px" }} htmlFor="name">Ask Question</label>
              <textarea style={{height:200}}className="form-control" id="name" />
          </div>
          <div className="form-group">
              <button style={{ marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary" type="submit">
                  Add
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