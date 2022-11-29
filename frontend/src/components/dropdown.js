import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from '@mui/material/Box';

function Dropdown() {
  const [selected, setSelected] = useState('');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };
  const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: theme.palette.grey[50],
      border: `1px solid ${theme.palette.info.main}`,
      color: theme.palette.info.main
    }
  }));
  const classes = useStyles();
  return (
    
    <FormControl style={{ width: "320px", marginLeft: 10 }}>
          <InputLabel>Space</InputLabel>
          <Select value={selected} onChange={selectionChangeHandler}>
              <MenuItem value={1}>GRE</MenuItem>
              <MenuItem value={2}>IELTS</MenuItem>
              <MenuItem value={3}>Housing</MenuItem>
              <MenuItem value={4}>Loan</MenuItem>
              <MenuItem value={5}>College</MenuItem>
          </Select>
          <FormHelperText>Select a space</FormHelperText>
      </FormControl>

   
  
  );
}

export default Dropdown;