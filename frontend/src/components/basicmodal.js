import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
  width: 400,
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
<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>    

    <form >
          <div className="form-group">
              <label style={{ marginBottom: "10px",marginTop:"15px" }} htmlFor="name">Title</label>
              <input className="form-control" id="name" />
          </div>
          <div className="form-group">
              <label style={{ marginBottom: "10px", marginTop: "15px" }} htmlFor="name">Ask Question</label>
              <textarea className="form-control" id="name" />
          </div>
          <div className="form-group">
              <button style={{ marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary" type="submit">
                  Add
              </button>
              <button style={{ marginRight: "10px", marginTop: "20px", width: "80px", float: "right" }} className="form-control btn btn-primary close" >
                  Cancel
              </button>
          </div>
      </form>
        </Box>
      </Modal>
    </div>
  );
}