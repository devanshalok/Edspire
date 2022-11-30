import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./drawer";
import SearchBar from "material-ui-search-bar";
import AccountMenu from "./accountmenu";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(1),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Edspire 
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/explore" className={classes.link}>
              Explore
            </Link>
            <Link to="/connect" className={classes.link}>
              Connect
            </Link>
            <Link to="/profile" className={classes.link}>
              College Finder
            </Link>
            
            <SearchBar style={{marginLeft:"20px",height:"45px",width:"400px"}} placeholder="Search for a college..."/>
            <AccountMenu/>
            <Link to="/login" className={classes.link}>
            <Button style={{marginLeft:"-4em",borderRadius: 15,backgroundColor: "#ffa726"}} variant="contained" href="#contained-buttons"> Login</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;