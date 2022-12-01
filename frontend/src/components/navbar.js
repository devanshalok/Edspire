import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import AccountMenu from "./accountmenu";
import BasicModal from "./basicmodal";
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    marginTop:"-0.5em"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(1),
    "&:hover": {
      color: "yellow",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const token = useSelector(state => {
    if (state.userSlice.profile && state.userSlice.profile.token) {
      return state.userSlice.profile.token
    } return undefined
  })

  function logoutNow() {
    dispatch(logout());
    console.log('logging out')
  };

  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
      <CssBaseline />
      <Toolbar style={{marginTop:10,display: "flex", flexDirection: "row", width: "100%" }}>
        <Typography variant="h4" className={classes.logo}>
          <Link style={{ textDecoration:"none",color:"white"}} to='./'>Edspire</Link>
        </Typography>
        {token ?
          (<div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/explore" className={classes.link}>
              Explore
            </Link>
            <Link to="/connect" className={classes.link}>
              Connect
            </Link>
            <Link style={{width:150}}to="/collegefinder" className={classes.link}>
              College Finder
            </Link>
            <SearchBar style={{ marginBottom: "10px", height: "45px", width: "400px" }} placeholder="Search for a college..." />
            <AccountMenu />
            <Link to="#" className={classes.link}>
              <Button style={{marginLeft: "-5.5em",marginTop:"-0.3em", borderRadius: 15, backgroundColor: "#ffa726" }}><BasicModal/></Button> 
            </Link>
          </div>) : (<div className={classes.navlinks}> <Link to="/login" className={classes.link}>
            <Button style={{ marginLeft: "-4em", borderRadius: 15, backgroundColor: "#ffa726" }} variant="contained" href="#contained-buttons"> Login</Button></Link>
          </div>)

        }
      </Toolbar>
    </AppBar >
  );
}
export default Navbar;