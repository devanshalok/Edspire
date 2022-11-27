import React, { useState } from "react";
import {makeStyles,} from "@material-ui/core";
import "./Login.css";
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from "./helpers"
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(5),
      display: "flex",
    },
    link: {
      textDecoration: "none",
      color: "black",
      fontSize: "15px",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      "&:hover": {
        color: "blue",
        borderBottom: "1px solid white",
      },
    },
  }));

export default function Profile() {
  return (
    <div style={{marginTop:"100px"}} className="Login">
  <ChakraProvider theme={theme}>
     <Main/>
     </ChakraProvider>
      
    </div>
  );
}





